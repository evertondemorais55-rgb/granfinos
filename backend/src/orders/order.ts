import { randomBytes } from 'node:crypto';
import { z } from 'zod';
import { business } from '../data/business.js';
import { findOrderable } from '../data/catalog.js';

export const orderInputSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(64),
        quantity: z.number().int().min(1).max(30),
      })
    )
    .min(1, 'A sacola está vazia.')
    .max(40),
  notes: z.string().trim().max(400).optional(),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export interface OrderLine {
  id: string;
  name: string;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderLine[];
  notes?: string;
  totalCents: number;
  whatsappUrl: string;
}

export class UnknownItemError extends Error {
  constructor(public readonly itemIds: string[]) {
    super(`Itens fora do cardápio: ${itemIds.join(', ')}`);
  }
}

export function formatBRL(cents: number): string {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
}

function newOrderId(): string {
  return `GF-${randomBytes(3).toString('hex').toUpperCase()}`;
}

/**
 * Monta o pedido com os preços do servidor (nunca confia no preço enviado pelo navegador)
 * e gera o link do WhatsApp com a mensagem pronta.
 */
export function buildOrder(input: OrderInput, now = new Date()): Order {
  // Junta linhas repetidas do mesmo item.
  const quantities = new Map<string, number>();
  for (const { id, quantity } of input.items) {
    quantities.set(id, (quantities.get(id) ?? 0) + quantity);
  }

  const unknown = [...quantities.keys()].filter((id) => !findOrderable(id));
  if (unknown.length > 0) throw new UnknownItemError(unknown);

  const items: OrderLine[] = [...quantities].map(([id, quantity]) => {
    const item = findOrderable(id)!;
    return {
      id,
      name: item.name,
      quantity,
      unitPriceCents: item.priceCents,
      totalCents: item.priceCents * quantity,
    };
  });

  const totalCents = items.reduce((sum, line) => sum + line.totalCents, 0);
  const id = newOrderId();
  const notes = input.notes || undefined;

  const message = [
    `Olá! Quero fazer um pedido na ${business.name} (pedido ${id}):`,
    '',
    ...items.map((line) => `• ${line.quantity}x ${line.name} — ${formatBRL(line.totalCents)}`),
    '',
    `Total: ${formatBRL(totalCents)}`,
    ...(notes ? [`Observações: ${notes}`] : []),
  ].join('\n');

  return {
    id,
    createdAt: now.toISOString(),
    items,
    notes,
    totalCents,
    whatsappUrl: `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`,
  };
}
