import { useEffect, useMemo, useState } from 'react';
import type { Catalog } from '@/lib/api';

export interface CartLine {
  id: string;
  name: string;
  priceCents: number;
  quantity: number;
}

type StoredLine = { id: string; quantity: number };

const STORAGE_KEY = 'granfinos:sacola';

function loadStored(): StoredLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * A sacola guarda só id e quantidade; nome e preço vêm sempre do cardápio atual,
 * então um preço alterado na API aparece certo mesmo numa sacola salva de outro dia.
 */
export function useCart(catalog: Catalog) {
  const [stored, setStored] = useState<StoredLine[]>(loadStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Navegação privada ou armazenamento bloqueado: a sacola só não persiste.
    }
  }, [stored]);

  const lines = useMemo<CartLine[]>(() => {
    const byId = new Map(
      [...catalog.items, ...catalog.drinks, ...catalog.combos].map((item) => [item.id, item])
    );
    return stored.flatMap(({ id, quantity }) => {
      const item = byId.get(id);
      return item ? [{ id, quantity, name: item.name, priceCents: item.priceCents }] : [];
    });
  }, [catalog, stored]);

  const add = (id: string) =>
    setStored((prev) =>
      prev.some((line) => line.id === id)
        ? prev.map((line) => (line.id === id ? { ...line, quantity: line.quantity + 1 } : line))
        : [...prev, { id, quantity: 1 }]
    );

  const changeQuantity = (id: string, delta: number) =>
    setStored((prev) =>
      prev
        .map((line) => (line.id === id ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0)
    );

  const clear = () => setStored([]);

  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const totalCents = lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);

  return { lines, count, totalCents, add, changeQuantity, clear };
}
