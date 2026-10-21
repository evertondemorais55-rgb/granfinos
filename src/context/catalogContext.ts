import { createContext } from 'react';
import type { Catalog } from '@/lib/api';

export interface CatalogState {
  catalog: Catalog;
  /** Vem da API em tempo real; undefined enquanto só temos a cópia local. */
  isOpen?: boolean;
}

export const CatalogContext = createContext<CatalogState | null>(null);
