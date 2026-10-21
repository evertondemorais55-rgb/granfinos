import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';
import { business, isOpenAt } from './data/business.js';
import { buildCatalog } from './data/catalog.js';
import { buildOrder, orderInputSchema, UnknownItemError } from './orders/order.js';
import type { OrderStore } from './orders/store.js';

interface AppOptions {
  store: OrderStore;
  /** Origens liberadas no CORS. Lista vazia libera qualquer origem (útil em desenvolvimento). */
  corsOrigins?: string[];
  now?: () => Date;
}

export function createApp({ store, corsOrigins = [], now = () => new Date() }: AppOptions) {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors({ origin: corsOrigins.length > 0 ? corsOrigins : true }));
  app.use(express.json({ limit: '20kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/catalog', (_req, res) => {
    res.set('Cache-Control', 'public, max-age=60');
    res.json({ business: { ...business, isOpen: isOpenAt(now()) }, ...buildCatalog() });
  });

  app.post('/api/orders', async (req, res) => {
    const parsed = orderInputSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Pedido inválido.', details: parsed.error.issues });
      return;
    }

    try {
      const order = buildOrder(parsed.data, now());
      await store.save(order);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof UnknownItemError) {
        res.status(400).json({ error: error.message, itemIds: error.itemIds });
        return;
      }
      throw error;
    }
  });

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
  });

  const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    // JSON malformado no corpo da requisição.
    if (error?.type === 'entity.parse.failed') {
      res.status(400).json({ error: 'JSON inválido.' });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno.' });
  };
  app.use(errorHandler);

  return app;
}
