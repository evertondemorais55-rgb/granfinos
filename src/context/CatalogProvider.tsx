import { useEffect, useState, type ReactNode } from 'react';
import snapshot from '@/data/catalog.snapshot.json';
import { api, apiEnabled } from '@/lib/api';
import { CatalogContext, type CatalogState } from './catalogContext';

/** Mostra a cópia local do cardápio na hora e troca pela versão da API quando ela responde. */
export default function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CatalogState>({ catalog: snapshot });

  useEffect(() => {
    if (!apiEnabled) return;
    const controller = new AbortController();
    api
      .getCatalog(controller.signal)
      .then(({ business, ...rest }) => {
        const { isOpen, ...staticBusiness } = business;
        setState({ catalog: { ...rest, business: staticBusiness }, isOpen });
      })
      .catch(() => {
        // API fora do ar: o site segue com a cópia local.
      });
    return () => controller.abort();
  }, []);

  return <CatalogContext.Provider value={state}>{children}</CatalogContext.Provider>;
}
