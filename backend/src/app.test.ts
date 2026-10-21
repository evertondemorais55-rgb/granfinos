import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { after, before, describe, it } from 'node:test';
import { createApp } from './app.js';
import { isOpenAt } from './data/business.js';
import { renderSnapshot, SNAPSHOT_PATH } from './export-catalog.js';
import { MemoryOrderStore } from './orders/store.js';

const store = new MemoryOrderStore();
let baseUrl = '';
let close: () => void;

before(async () => {
  const server = createApp({ store }).listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://localhost:${(server.address() as AddressInfo).port}`;
  close = () => server.close();
});

after(() => close());

function postOrder(body: unknown) {
  return fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('GET /api/catalog', () => {
  it('retorna cardápio, bebidas, combos e dados da loja', async () => {
    const res = await fetch(`${baseUrl}/api/catalog`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.items.length > 0);
    assert.ok(data.drinks.length > 0);
    assert.equal(data.combos[0].fullPriceCents, 6900);
    assert.equal(typeof data.business.isOpen, 'boolean');
  });
});

describe('POST /api/orders', () => {
  it('calcula o total com o preço do servidor e gera o link do WhatsApp', async () => {
    const res = await postOrder({
      items: [
        { id: 'gran-monster-angus', quantity: 2 },
        { id: 'refri-lata', quantity: 1 },
        { id: 'gran-monster-angus', quantity: 1 },
      ],
      notes: 'Sem cebola',
    });
    assert.equal(res.status, 201);
    const order = await res.json();

    assert.match(order.id, /^GF-[0-9A-F]{6}$/);
    assert.equal(order.items.length, 2);
    assert.equal(order.items[0].quantity, 3);
    assert.equal(order.totalCents, 3 * 5200 + 500);

    const text = decodeURIComponent(new URL(order.whatsappUrl).searchParams.get('text') ?? '');
    assert.match(text, /3x Gran Monster Angus — R\$ 156,00/);
    assert.match(text, /Total: R\$ 161,00/);
    assert.match(text, /Observações: Sem cebola/);
    assert.equal(store.orders.at(-1)?.id, order.id);
  });

  it('ignora preço enviado pelo cliente', async () => {
    const res = await postOrder({ items: [{ id: 'smash-simples', quantity: 1, priceCents: 1 }] });
    assert.equal((await res.json()).totalCents, 1900);
  });

  it('recusa item que não está no cardápio', async () => {
    const res = await postOrder({ items: [{ id: 'pizza', quantity: 1 }] });
    assert.equal(res.status, 400);
    assert.deepEqual((await res.json()).itemIds, ['pizza']);
  });

  it('recusa sacola vazia, quantidade inválida e JSON quebrado', async () => {
    assert.equal((await postOrder({ items: [] })).status, 400);
    assert.equal((await postOrder({ items: [{ id: 'smash-simples', quantity: 0 }] })).status, 400);
    assert.equal((await postOrder('{oops')).status, 400);
  });
});

describe('cópia do cardápio no frontend', () => {
  it('está igual ao cardápio do backend (rode npm run export:catalog se falhar)', async () => {
    const snapshot = await readFile(SNAPSHOT_PATH, 'utf8');
    assert.equal(snapshot.replace(/\r\n/g, '\n'), renderSnapshot());
  });
});

describe('isOpenAt', () => {
  it('usa o horário de Brasília (19h às 23h)', () => {
    assert.equal(isOpenAt(new Date('2026-10-21T22:30:00Z')), true); // 19:30 em Brasília
    assert.equal(isOpenAt(new Date('2026-10-21T21:59:00Z')), false); // 18:59
    assert.equal(isOpenAt(new Date('2026-10-22T02:00:00Z')), false); // 23:00
  });
});
