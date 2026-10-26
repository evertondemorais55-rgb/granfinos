import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CallToAction() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="bg-gf-black pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal rounded-[2.25rem] bg-gf-orange px-8 py-14 text-center text-gf-black sm:px-14 lg:py-20">
          <h2 className="font-display text-5xl uppercase leading-[0.96] sm:text-6xl lg:text-7xl">
            BATEU AQUELA FOME?
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-lg">
            A chapa já tá acesa. Monta sua sacola e manda pelo WhatsApp que a gente começa o seu
            burger agora mesmo.
          </p>
          <a
            href="#cardapio"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gf-black px-9 py-4 text-base font-bold uppercase tracking-wider text-white transition-colors hover:bg-gf-black-light"
          >
            Montar meu pedido
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
