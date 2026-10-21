import { useEffect, useState } from 'react';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartLine } from '@/hooks/useCart';
import { useCatalog } from '@/hooks/useCatalog';
import { api, apiEnabled } from '@/lib/api';
import { formatBRL, whatsappLink } from '@/lib/format';

interface CartDrawerProps {
  lines: CartLine[];
  totalCents: number;
  onChangeQuantity: (id: string, delta: number) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function CartDrawer({
  lines,
  totalCents,
  onChangeQuantity,
  onClear,
  onClose,
}: CartDrawerProps) {
  const { business } = useCatalog().catalog;
  const [notes, setNotes] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Usado só se a API estiver fora do ar: o cliente ainda consegue mandar o pedido.
  const fallbackLink = () =>
    whatsappLink(
      business.whatsapp,
      [
        `Olá! Quero fazer um pedido na ${business.name}:`,
        '',
        ...lines.map((l) => `• ${l.quantity}x ${l.name} — ${formatBRL(l.priceCents * l.quantity)}`),
        '',
        `Total: ${formatBRL(totalCents)}`,
        ...(notes.trim() ? [`Observações: ${notes.trim()}`] : []),
      ].join('\n')
    );

  const checkout = async () => {
    // Abre a aba antes do await: depois dele o navegador bloquearia como pop-up.
    const tab = window.open('', '_blank');
    if (tab) tab.opener = null;
    setSending(true);

    let url: string;
    try {
      if (!apiEnabled) throw new Error('API desativada');
      const order = await api.createOrder({
        items: lines.map(({ id, quantity }) => ({ id, quantity })),
        notes: notes.trim() || undefined,
      });
      url = order.whatsappUrl;
    } catch {
      url = fallbackLink();
    }

    setSending(false);
    if (tab) tab.location.href = url;
    else window.location.href = url;
    onClear();
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="flex h-full w-full max-w-md flex-col bg-gf-black-light p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 id="cart-title" className="font-display text-3xl uppercase tracking-wide text-white">
              Sua sacola
            </h2>
            <p className="text-base text-gray-400">Finalize o pedido direto no WhatsApp</p>
          </div>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.07] text-gray-300 transition-colors hover:text-white"
            aria-label="Fechar sacola"
          >
            <X size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="my-auto py-12 text-center">
            <ShoppingBag size={40} className="mx-auto text-gray-600" />
            <p className="mt-4 font-display text-2xl uppercase text-white">Sacola vazia</p>
            <p className="mt-1 text-base text-gray-400">
              Adicione hambúrgueres, combos ou bebidas pelo cardápio.
            </p>
          </div>
        ) : (
          <>
            <ul className="my-6 flex-1 space-y-3 overflow-y-auto pr-1">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-gf-black p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-semibold text-white">{line.name}</div>
                    <div className="text-sm font-semibold text-gf-orange">
                      {formatBRL(line.priceCents * line.quantity)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(line.id, -1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.07] text-white transition-colors hover:bg-gf-orange/20"
                      aria-label={`Tirar um ${line.name}`}
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-6 text-center text-base font-bold text-white">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(line.id, 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.07] text-white transition-colors hover:bg-gf-orange/20"
                      aria-label={`Mais um ${line.name}`}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </li>
              ))}

              <li className="pt-2">
                <label htmlFor="order-notes" className="mb-1.5 block text-sm font-semibold text-gray-300">
                  Observações (opcional)
                </label>
                <textarea
                  id="order-notes"
                  rows={2}
                  maxLength={400}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex.: sem cebola, carne bem passada, troco para R$ 100"
                  className="w-full rounded-xl border border-white/10 bg-gf-black px-3.5 py-2.5 text-base text-white placeholder-gray-500 focus:border-gf-orange focus:outline-none"
                />
              </li>
            </ul>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClear}
                className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-red-400"
              >
                <Trash2 size={15} />
                Limpar sacola
              </button>
              <div className="text-right">
                <span className="text-sm text-gray-400">Total</span>
                <div className="font-display text-3xl text-gf-orange">{formatBRL(totalCents)}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={checkout}
              disabled={sending}
              className="btn-primary mt-5 w-full !py-4"
            >
              <MessageCircle size={18} />
              {sending ? 'Enviando…' : 'Enviar pedido no WhatsApp'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
