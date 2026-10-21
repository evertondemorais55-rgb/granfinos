import { useEffect, useRef, useState } from 'react';
import { Check, GlassWater, Plus } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { MenuItem } from '@/lib/api';
import { assetUrl, formatBRL } from '@/lib/format';

type FilterTab = 'featured' | 'angus' | 'smash';

const tabs: { id: FilterTab; label: string }[] = [
  { id: 'featured', label: 'Destaques' },
  { id: 'angus', label: 'Angus 160g' },
  { id: 'smash', label: 'Smash & fritas' },
];

// Cada aba mostra 6 itens: 2 linhas de 3 no desktop, sem card sobrando sozinho.
function itemsForTab(items: MenuItem[], tab: FilterTab): MenuItem[] {
  if (tab === 'featured') return items.filter((item) => item.featured).slice(0, 6);
  if (tab === 'angus') {
    const angus = items.filter((item) => item.category === 'angus');
    const loaded = items.filter((item) => item.id === 'batata-loaded');
    return [...angus, ...loaded].slice(0, 6);
  }
  return items.filter((item) => item.category === 'smash' || item.category === 'sides').slice(0, 6);
}

interface MenuProps {
  onAdd: (id: string) => void;
}

export default function Menu({ onAdd }: MenuProps) {
  const ref = useScrollReveal<HTMLElement>();
  const { catalog } = useCatalog();
  const [activeTab, setActiveTab] = useState<FilterTab>('featured');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const feedbackTimer = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  const handleAdd = (id: string) => {
    onAdd(id);
    setJustAddedId(id);
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setJustAddedId(null), 1100);
  };

  return (
    <section ref={ref} id="cardapio" className="bg-gf-black-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="reveal section-title">
              ESCOLHA O SEU <span className="text-gf-orange">FAVORITO.</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-4 max-w-[56ch] text-lg text-gray-300">
              Montado na hora, bem recheado e servido no ponto. Monte sua sacola e finalize no
              WhatsApp.
            </p>
          </div>

          <div
            className="reveal reveal-delay-2 flex flex-wrap gap-1 rounded-2xl bg-gf-black p-1.5"
            role="tablist"
            aria-label="Categorias do cardápio"
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                    active ? 'bg-gf-orange text-gf-black' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" role="tabpanel">
          {itemsForTab(catalog.items, activeTab).map((item) => {
            const isAdded = justAddedId === item.id;
            return (
              <article
                key={item.id}
                className="card-hover group flex flex-col overflow-hidden rounded-3xl bg-gf-black-card"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gf-black">
                  <img
                    src={assetUrl(item.image)}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-gf-orange px-3.5 py-1 text-[13px] font-bold text-gf-black">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-display text-2xl text-gf-orange">
                      {formatBRL(item.priceCents)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gf-orange-light">{item.subtitle}</p>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-gray-400">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleAdd(item.id)}
                    className={`mt-6 flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-bold uppercase tracking-wider transition-colors duration-200 active:scale-[0.98] ${
                      isAdded
                        ? 'bg-emerald-500 text-black'
                        : 'bg-gf-orange text-gf-black hover:bg-gf-orange-light'
                    }`}
                  >
                    {isAdded ? <Check size={16} /> : <Plus size={16} />}
                    {isAdded ? 'Adicionado' : 'Adicionar à sacola'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="reveal mt-16 rounded-3xl bg-gf-black p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <GlassWater size={24} className="text-gf-orange" />
            <h3 className="font-display text-2xl uppercase tracking-wide text-white">
              Bebidas geladas
            </h3>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
            {catalog.drinks.map((drink) => {
              const isAdded = justAddedId === drink.id;
              return (
                <li key={drink.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold text-white">{drink.name}</div>
                    <p className="text-sm text-gray-400">{drink.detail}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-display text-lg text-gf-orange">
                      {formatBRL(drink.priceCents)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdd(drink.id)}
                      aria-label={`Adicionar ${drink.name} à sacola`}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        isAdded
                          ? 'bg-emerald-500 text-black'
                          : 'bg-gf-orange/15 text-gf-orange-light hover:bg-gf-orange hover:text-gf-black'
                      }`}
                    >
                      {isAdded ? <Check size={16} /> : <Plus size={16} />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="reveal mt-8 text-center text-base text-gray-400">
          Todo hambúrguer acompanha a maionese da casa · Preparo na hora,{' '}
          {catalog.business.prepTime}
        </p>
      </div>
    </section>
  );
}
