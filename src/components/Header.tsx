import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { navLinks, photos } from '@/data/content';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? 'bg-gf-black/95 py-3 backdrop-blur-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#inicio" className="group flex items-center gap-3">
          <img
            src={photos.logo}
            alt=""
            className="h-12 w-12 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-2xl leading-none tracking-wider text-white">
            GRAN<span className="text-gf-orange">FINOS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Seções">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative px-3.5 py-2 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gf-orange transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          {cartCount > 0 && (
            <button
              type="button"
              onClick={onOpenCart}
              className="flex h-10 items-center gap-2 rounded-full bg-gf-orange/15 px-4 text-sm font-bold text-gf-orange-light transition-colors hover:bg-gf-orange/25"
              aria-label={`Abrir sacola com ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
            >
              <ShoppingBag size={16} />
              <span>
                <span className="hidden lg:inline">Sacola </span>
                {cartCount}
              </span>
            </button>
          )}
          <a href="#cardapio" className="btn-primary hidden !px-6 !py-2.5 !text-xs lg:inline-flex">
            Fazer pedido
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-white lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? 'max-h-[560px] opacity-100' : 'invisible max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 pb-6 pt-3" aria-label="Seções">
          <div className="flex flex-col gap-1 rounded-2xl bg-gf-black-light p-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-gray-200 transition-colors hover:bg-white/5 hover:text-gf-orange"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cardapio"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 w-full !py-3.5"
            >
              Fazer pedido
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
