import { MessageCircle } from 'lucide-react';
import { useCatalog } from '@/hooks/useCatalog';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { whatsappLink } from '@/lib/format';

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>();
  const { business } = useCatalog().catalog;

  const contactInfo = [
    { label: 'Endereço', value: business.address.line1, sub: business.address.line2 },
    { label: 'WhatsApp', value: business.phoneDisplay, sub: 'Pedidos para entrega e retirada' },
    {
      label: 'Horário',
      value: `${business.hours.opens.slice(0, 2)}h às ${business.hours.closes.slice(0, 2)}h`,
      sub: business.hours.days,
    },
    { label: 'Instagram', value: `@${business.instagram}`, sub: 'Lançamentos e promoções' },
  ];

  return (
    <section ref={ref} id="contato" className="bg-gf-black-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="reveal section-title">
            VEM PARA A <span className="text-gf-orange">GRANFINOS.</span>
          </h2>
          <p className="reveal reveal-delay-1 max-w-md text-lg text-gray-400">
            Peça pelo WhatsApp para receber em casa ou venha retirar seu hambúrguer quentinho no
            Varjão.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="reveal flex flex-col justify-between gap-10 lg:col-span-5">
            <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {contactInfo.map((info) => (
                <div key={info.label}>
                  <dt className="text-sm font-semibold text-gf-orange-light">{info.label}</dt>
                  <dd className="mt-1 font-display text-xl tracking-wide text-white">{info.value}</dd>
                  <dd className="mt-1 text-base text-gray-400">{info.sub}</dd>
                </div>
              ))}
            </dl>

            <a
              href={whatsappLink(business.whatsapp, `Olá! Gostaria de fazer um pedido na ${business.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full !py-4 !text-base"
            >
              <MessageCircle size={20} />
              Chamar no WhatsApp
            </a>
          </div>

          <div className="reveal reveal-delay-2 lg:col-span-7">
            <div className="h-full min-h-[380px] overflow-hidden rounded-3xl bg-gf-black">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(business.address.mapsQuery)}&output=embed`}
                className="h-full min-h-[380px] w-full border-0"
                loading="lazy"
                title={`Mapa: ${business.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
