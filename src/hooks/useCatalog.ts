import { useContext } from 'react';
import { CatalogContext } from '@/context/catalogContext';

export function useCatalog() {
  const state = useContext(CatalogContext);
  if (!state) throw new Error('useCatalog precisa estar dentro de <CatalogProvider>.');
  return state;
}
