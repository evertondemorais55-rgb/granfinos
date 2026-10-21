import { Flame } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';

export default function Marquee() {
  const { hours } = useCatalog().catalog.business;
  const items = [
    'BLEND ANGUS 160G',
    'PÃO BRIOCHE SELADO NA MANTEIGA',
    'SMASH BURGER NA CHAPA',
    'MAIONESE CASEIRA',
    'CHEDDAR CREMOSO & BACON CROCANTE',
    `ABERTO TODOS OS DIAS DAS ${hours.opens.slice(0, 2)}H ÀS ${hours.closes.slice(0, 2)}H`,
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-gf-orange py-3.5" aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-lg uppercase tracking-wider text-gf-black">
              {item}
            </span>
            <Flame size={16} className="shrink-0 text-gf-black/50" />
          </div>
        ))}
      </div>
    </div>
  );
}
