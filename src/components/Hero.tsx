import { useEffect, useState } from 'react';
import { ArrowRight, Clock, MapPin, Plus, Star } from 'lucide-react';
import { heroShowcaseIds } from '@/data/content';
import { useCatalog } from '@/hooks/useCatalog';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { assetUrl, formatBRL } from '@/lib/format';

const SLIDE_INTERVAL_MS = 3500;

interface HeroProps {
  onAdd: (id: string) => void;
}

export default function Hero({ onAdd }: HeroProps) {
  const ref = useScrollReveal<HTMLElement>();
  const { catalog, isOpen } = useCatalog();
  const { business } = catalog;
  const showcase = heroShowcaseIds.flatMap((id) => catalog.items.filter((item) => item.id === id));
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = showcase[activeSlide % showcase.length];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % showcase.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, showcase.length]);

  const opensAt = business.hours.opens.slice(0, 2);
  const closesAt = business.hours.closes.slice(0, 2);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-gf-black pb-16 pt-28 lg:pb-24 lg:pt-32"
    >
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          {isOpen !== undefined && (
            <p className="reveal mb-6 flex items-center gap-2 text-base text-gray-300">
              <span
                className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-gray-500'}`}
              />
              {isOpen ? `Aberto agora · chapa acesa até ${closesAt}h` : `Fechado agora · abrimos às ${opensAt}h`}
            </p>
          )}

          <h1 className="reveal reveal-delay-1 font-display text-5xl uppercase leading-[0.94] tracking-tight text-white sm:text-7xl lg:text-[5.4rem]">
            CARNE NA BRASA.
            <br />
            SABOR <span className="text-gf-orange">GRANFINOS.</span>
          </h1>

          <p className="reveal reveal-delay-2 mt-6 max-w-[56ch] text-lg leading-relaxed text-gray-300">
            Hamburgueria artesanal no Varjão, em Brasília. Angus de 160g no ponto certo, queijo
            escorrendo, bacon crocante e maionese da casa. Pede pelo WhatsApp que a gente chapeia na
            hora e entrega quentinho.
          </p>

          <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <a href="#cardapio" className="btn-primary group">
              <span>Ver cardápio</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a href="#combo" className="btn-secondary">
              Combo do dia
            </a>
          </div>

          <dl className="reveal reveal-delay-4 mt-12 grid max-w-lg grid-cols-3 gap-6">
            <div>
              <dt className="sr-only">Avaliação</dt>
              <dd className="flex items-center gap-1.5 font-display text-3xl text-white">
                4.9 <Star size={18} className="fill-gf-orange text-gf-orange" />
              </dd>
              <dd className="mt-1 text-sm text-gray-400">Nota dos clientes</dd>
            </div>
            <div>
              <dt className="sr-only">Carne</dt>
              <dd className="font-display text-3xl text-white">160G</dd>
              <dd className="mt-1 text-sm text-gray-400">Blend Angus</dd>
            </div>
            <div>
              <dt className="sr-only">Horário</dt>
              <dd className="font-display text-3xl text-gf-orange">
                {opensAt}H–{closesAt}H
              </dd>
              <dd className="mt-1 text-sm text-gray-400">Todos os dias</dd>
            </div>
          </dl>
        </div>

        <div
          className="reveal reveal-delay-2 lg:col-span-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="mx-auto max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] bg-gf-black-card">
              <div className="relative aspect-[4/3.6] w-full overflow-hidden bg-gf-black-light">
                {showcase.map((slide) => (
                  <img
                    key={slide.id}
                    src={assetUrl(slide.image)}
                    alt={slide.name}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                      slide.id === current.id
                        ? 'z-10 scale-100 opacity-100'
                        : 'pointer-events-none z-0 scale-105 opacity-0'
                    }`}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-gf-black/80 via-transparent to-transparent" />

                <div className="absolute right-4 top-4 z-30 rounded-full bg-gf-orange px-3.5 py-1.5 font-display text-base tracking-wide text-gf-black">
                  {formatBRL(current.priceCents)}
                </div>

                <div className="absolute bottom-4 left-6 z-30 flex items-center gap-1.5">
                  {showcase.map((slide) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlide(showcase.indexOf(slide))}
                      aria-label={`Ver ${slide.name}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        slide.id === current.id ? 'w-7 bg-gf-orange' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div className="min-w-0">
                  <div className="truncate font-display text-xl uppercase tracking-wide text-white">
                    {current.name}
                  </div>
                  <div className="truncate text-sm text-gray-400">{current.subtitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onAdd(current.id)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-gf-orange/15 px-4 py-2.5 text-sm font-bold text-gf-orange-light transition-colors hover:bg-gf-orange hover:text-gf-black"
                >
                  <Plus size={16} />
                  Pedir este
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {showcase.map((item) => {
                const isActive = item.id === current.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSlide(showcase.indexOf(item))}
                    className={`flex items-center gap-2 rounded-2xl p-2 text-left transition-colors duration-300 ${
                      isActive ? 'bg-gf-orange/15' : 'bg-gf-black-light hover:bg-gf-black-card'
                    }`}
                  >
                    <img
                      src={assetUrl(item.image)}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <div
                        className={`truncate text-sm font-semibold ${
                          isActive ? 'text-gf-orange-light' : 'text-white'
                        }`}
                      >
                        {item.name.replace('Gran ', '').replace(' Angus', '')}
                      </div>
                      <div className="text-[13px] text-gray-400">{formatBRL(item.priceCents)}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-gf-orange" />
                {business.address.short}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-gf-orange" />
                Preparo: {business.prepTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
