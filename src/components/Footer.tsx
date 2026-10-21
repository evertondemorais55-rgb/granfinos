import { Instagram } from 'lucide-react';
import { navLinks, photos } from '@/data/content';
import { useCatalog } from '@/hooks/useCatalog';

export default function Footer() {
  const { business } = useCatalog().catalog;

  return (
    <footer className="bg-gf-black">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <a href="#inicio" className="flex items-center gap-3">
              <img src={photos.logo} alt="" className="h-12 w-12 rounded-xl object-cover" />
              <span className="font-display text-2xl tracking-wider text-white">
                GRAN<span className="text-gf-orange">FINOS</span>
              </span>
            </a>
            <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-gray-400">
              Hambúrguer artesanal no Varjão, Brasília. Angus 160g, smash na chapa e porções feitas
              na hora.
            </p>
            <a
              href={`https://instagram.com/${business.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gf-black-light text-gray-300 transition-colors hover:text-gf-orange"
              aria-label="Instagram da Granfinos"
            >
              <Instagram size={20} />
            </a>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="font-display text-base uppercase tracking-wider text-gf-orange">Navegação</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-base text-gray-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-base uppercase tracking-wider text-gf-orange">Contato</h3>
            <ul className="mt-4 space-y-2.5 text-base text-gray-400">
              <li>{business.address.line1}</li>
              <li>{business.address.line2}</li>
              <li>{business.phoneDisplay}</li>
              <li>@{business.instagram}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base uppercase tracking-wider text-gf-orange">
              Funcionamento
            </h3>
            <p className="mt-4 text-base text-white">{business.hours.days}</p>
            <p className="text-base text-gray-400">
              Das {business.hours.opens.slice(0, 2)}h às {business.hours.closes.slice(0, 2)}h
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 text-sm text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {business.name}. Todos os direitos reservados.</p>
          <p>Brasília · DF · Feito na brasa</p>
        </div>
      </div>
    </footer>
  );
}
