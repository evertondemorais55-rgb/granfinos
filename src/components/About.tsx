import { useEffect, useState } from 'react';
import { photos } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const aboutSlides = [
  { url: photos.rings, caption: 'Gran Rings com maionese verde', alt: 'Hambúrguer artesanal com anéis de cebola e maionese verde' },
  { url: photos.monster, caption: 'Gran Monster Angus, 320g de carne', alt: 'Gran Monster Angus com duplo cheddar e bacon' },
  { url: photos.egg, caption: 'Gran Egg com ovo na chapa', alt: 'Gran Egg Angus com ovo, bacon e queijo derretido' },
  { url: photos.salada, caption: 'Alface e tomate fresquinhos', alt: 'Gran Salada Angus com alface e tomate' },
];

const pillars = [
  {
    title: 'Carne alta e ponto certo',
    description:
      'Blend Angus de 160g chapeado no fogo alto: casquinha dourada por fora, suculento por dentro.',
  },
  {
    title: 'Pão selado e queijo escorrendo',
    description:
      'Brioche dourado na chapa com manteiga, queijo derretendo de verdade e bacon crocante.',
  },
  {
    title: 'Maionese da casa',
    description: 'Receita nossa, feita todo dia. É o molho que todo mundo pede pote extra.',
  },
];

export default function About() {
  const ref = useScrollReveal<HTMLElement>();
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % aboutSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} id="sobre" className="bg-gf-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="reveal section-title max-w-4xl">
          MAIS QUE UM HAMBÚRGUER. <span className="text-gf-orange">TRADIÇÃO NA CHAPA.</span>
        </h2>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal grid grid-cols-2 gap-4 lg:col-span-6">
            <div className="relative col-span-2 aspect-[16/11] overflow-hidden rounded-3xl bg-gf-black-light">
              {aboutSlides.map((slide, idx) => (
                <img
                  key={slide.url}
                  src={slide.url}
                  alt={slide.alt}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                    idx === activePhoto
                      ? 'z-10 scale-100 opacity-100'
                      : 'pointer-events-none z-0 scale-105 opacity-0'
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-gf-black/80 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-5 z-30 text-base font-semibold text-white">
                {aboutSlides[activePhoto].caption}
              </p>
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gf-black-light">
              <img
                src={photos.bacon}
                alt="Gran Bacon Angus com queijo derretido"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gf-black-light">
              <img
                src={photos.fries}
                alt="Porção de batata frita crocante"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="reveal reveal-delay-1 max-w-[60ch] text-lg leading-relaxed text-gray-300">
              A Granfinos começou no Varjão com uma chapa quente e uma ideia bem clara: fazer
              hambúrguer como a gente gosta de comer. Carne no ponto, queijo derretido escorrendo,
              bacon fatiado na hora e maionese feita na casa. Sem firula, só comida boa entregue
              quentinha na sua porta.
            </p>

            <ol className="mt-10 space-y-8">
              {pillars.map((item, i) => (
                <li key={item.title} className={`reveal reveal-delay-${i + 2} flex gap-5`}>
                  <span className="font-display text-4xl leading-none text-gf-orange">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-[52ch] text-base leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
