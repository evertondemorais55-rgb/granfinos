import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryImages } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const total = galleryImages.length;

export default function Gallery() {
  const ref = useScrollReveal<HTMLElement>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const isOpen = selectedIndex !== null;

  // Destaque automático passando pelas fotos enquanto o lightbox está fechado.
  useEffect(() => {
    if (isOpen) return;
    const timer = setInterval(() => setSpotlightIndex((prev) => (prev + 1) % total), 3000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Lightbox: Esc fecha, setas navegam, e a página de trás não rola.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((i) => (i === null ? i : (i + 1) % total));
      if (e.key === 'ArrowLeft') setSelectedIndex((i) => (i === null ? i : (i - 1 + total) % total));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const selected = selectedIndex === null ? null : galleryImages[selectedIndex];

  return (
    <section ref={ref} id="galeria" className="bg-gf-black-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="reveal section-title">
            DIRETO DA NOSSA <span className="text-gf-orange">CHAPA.</span>
          </h2>
          <p className="reveal reveal-delay-1 max-w-md text-lg text-gray-400">
            Fotos reais dos nossos lanches, feitos todo dia aqui na Granfinos.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img, i) => (
            <button
              key={img.title}
              type="button"
              onClick={() => setSelectedIndex(i)}
              onMouseEnter={() => setSpotlightIndex(i)}
              aria-label={`Ampliar foto: ${img.title}`}
              className={`card-hover group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gf-black text-left ring-2 transition-shadow duration-500 ${
                i === spotlightIndex ? 'ring-gf-orange/70' : 'ring-transparent'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  i === spotlightIndex ? 'scale-[1.03]' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gf-black/90 via-gf-black/10 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <div className="font-display text-xl uppercase tracking-wide text-white">{img.title}</div>
                <div className="mt-0.5 text-sm text-gray-300">{img.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-gf-black-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gf-black/80 text-white transition-colors hover:text-gf-orange"
              aria-label="Fechar foto"
            >
              <X size={20} />
            </button>

            <div className="relative bg-black">
              <img src={selected.url} alt={selected.alt} className="max-h-[72vh] w-full object-contain" />
              <button
                type="button"
                onClick={() => setSelectedIndex((selectedIndex - 1 + total) % total)}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gf-black/80 text-white transition-colors hover:text-gf-orange"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setSelectedIndex((selectedIndex + 1) % total)}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gf-black/80 text-white transition-colors hover:text-gf-orange"
                aria-label="Próxima foto"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <div className="font-display text-2xl uppercase text-white">{selected.title}</div>
                <p className="mt-0.5 text-base text-gray-400">{selected.subtitle}</p>
              </div>
              <span className="font-display text-base text-gf-orange">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
