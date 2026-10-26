import type snapshot from '@/data/catalog.snapshot.json';

export type Catalog = typeof snapshot;
export type MenuItem = Catalog['items'][number];
export type Business = Catalog['business'];

export interface LiveCatalog extends Catalog {
  business: Business & { isOpen: boolean };
}

export interface OrderInput {
  items: { id: string; quantity: number }[];
  notes?: string;
}

export interface Order {
  id: string;
  totalCents: number;
  whatsappUrl: string;
}

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

/** Sem VITE_API_URL no build de produção, o site funciona só com a cópia local do cardápio. */
export const apiEnabled = import.meta.env.DEV || API_URL !== '';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, body.error ?? `Erro ${res.status}`);
  return body as T;
}

export const api = {
  getCatalog: (signal?: AbortSignal) => request<LiveCatalog>('/api/catalog', { signal }),
  createOrder: (input: OrderInput) =>
    request<Order>('/api/orders', { method: 'POST', body: JSON.stringify(input) }),
};
