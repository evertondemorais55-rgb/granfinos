import { Plus } from 'lucide-react';
import { photos } from '@/data/content';
import { useCatalog } from '@/hooks/useCatalog';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { formatBRL } from '@/lib/format';

interface ComboHighlightProps {
  onAdd: (id: string) => void;
}

export default function ComboHighlight({ onAdd }: ComboHighlightProps) {
  const ref = useScrollReveal<HTMLElement>();
  const combo = useCatalog().catalog.combos[0];
  if (!combo) return null;

  const savingsCents = combo.fullPriceCents - combo.priceCents;

  return (
    <section ref={ref} id="combo" className="bg-gf-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 rounded-[2.25rem] bg-gf-black-light p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <h2 className="reveal section-title">
              EXPERIÊNCIA COMPLETA <span className="text-gf-orange">EM DOBRO.</span>
            </h2>

            <p className="reveal reveal-delay-1 mt-4 max-w-[52ch] text-lg leading-relaxed text-gray-300">
              {combo.description}
              {savingsCents > 0 && ` Você economiza ${formatBRL(savingsCents)} no pedido.`}
            </p>

            <ul className="reveal reveal-delay-2 mt-8 space-y-3 text-lg text-white">
              {combo.includesLabels.map((label) => (
                <li key={label} className="flex items-baseline gap-3">
                  <span className="font-display text-gf-orange">1x</span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-end gap-6">
              <div>
                {savingsCents > 0 && (
                  <span className="text-base text-gray-400 line-through">
                    {formatBRL(combo.fullPriceCents)}
                  </span>
                )}
                <div className="font-display text-5xl leading-none text-white">
                  {formatBRL(combo.priceCents)}
                </div>
              </div>
              <button type="button" onClick={() => onAdd(combo.id)} className="btn-primary">
                <Plus size={18} />
                Adicionar combo
              </button>
            </div>
          </div>

          <div className="reveal reveal-delay-2 order-1 grid grid-cols-12 gap-4 lg:order-2 lg:col-span-6">
            <div className="relative col-span-7 aspect-[4/4.3] overflow-hidden rounded-3xl bg-gf-black">
              <img
                src={photos.bacon}
                alt="Gran Bacon Angus do combo"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <div className="relative min-h-[160px] flex-1 overflow-hidden rounded-3xl bg-gf-black">
                <img
                  src={photos.loaded}
                  alt="Batata loaded com cheddar e bacon"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {savingsCents > 0 && (
                <div className="rounded-3xl bg-gf-orange p-5 text-center text-gf-black">
                  <span className="text-base font-semibold">Economize</span>
                  <span className="mt-1 block font-display text-3xl">{formatBRL(savingsCents)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
