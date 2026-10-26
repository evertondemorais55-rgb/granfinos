import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { Order } from './order.js';

export interface OrderStore {
  save(order: Order): Promise<void>;
}

/** Grava cada pedido como uma linha JSON. Simples de ler e trocar por um banco depois. */
export class FileOrderStore implements OrderStore {
  constructor(private readonly file: string) {}

  async save(order: Order): Promise<void> {
    await mkdir(dirname(this.file), { recursive: true });
    await appendFile(this.file, `${JSON.stringify(order)}\n`, 'utf8');
  }
}

export class MemoryOrderStore implements OrderStore {
  readonly orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }
}
