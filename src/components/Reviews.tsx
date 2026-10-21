import { Star } from 'lucide-react';
import { reviews } from '@/data/content';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Reviews() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="avaliacoes" className="bg-gf-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="reveal section-title">
            QUEM PROVA, <span className="text-gf-orange">RECOMENDA.</span>
          </h2>
          <div className="reveal reveal-delay-1 flex items-center gap-3">
            <div className="flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={20} className="fill-gf-orange text-gf-orange" />
              ))}
            </div>
            <span className="font-display text-2xl text-white">4.9</span>
            <span className="text-base text-gray-400">de média</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <figure
              key={review.author}
              className={`reveal reveal-delay-${i + 1} flex flex-col justify-between rounded-3xl bg-gf-black-light p-7`}
            >
              <div>
                <div className="flex gap-1" aria-label={`${review.rating} de 5 estrelas`}>
                  {Array.from({ length: review.rating }, (_, j) => (
                    <Star key={j} size={16} className="fill-gf-orange text-gf-orange" />
                  ))}
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-gray-200">
                  “{review.text}”
                </blockquote>
              </div>

              <figcaption className="mt-8 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gf-orange/15 font-display text-base text-gf-orange">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">{review.author}</div>
                  <div className="text-sm text-gray-400">
                    {review.role} · pediu {review.order}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
