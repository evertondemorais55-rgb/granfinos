// Gera a cópia do cardápio que o frontend usa para abrir na hora, antes da API responder.
// Rode depois de mudar src/data: npm run export:catalog
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { business } from './data/business.js';
import { buildCatalog } from './data/catalog.js';

export const SNAPSHOT_PATH = fileURLToPath(
  new URL('../../src/data/catalog.snapshot.json', import.meta.url)
);

export function renderSnapshot(): string {
  return `${JSON.stringify({ business, ...buildCatalog() }, null, 2)}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeFile(SNAPSHOT_PATH, renderSnapshot(), 'utf8');
  console.log(`Cardápio exportado para ${SNAPSHOT_PATH}`);
}
