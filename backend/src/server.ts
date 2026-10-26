import { createApp } from './app.js';
import { FileOrderStore } from './orders/store.js';

const port = Number(process.env.PORT ?? 3333);
const corsOrigins = (process.env.CORS_ORIGIN ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = createApp({
  store: new FileOrderStore(process.env.ORDERS_FILE ?? 'data/orders.jsonl'),
  corsOrigins,
});

app.listen(port, () => {
  console.log(`API Granfinos rodando em http://localhost:${port}`);
});
