import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatBRL } from '@/lib/format';

interface FloatingCartProps {
  cartCount: number;
  totalCents: number;
  onOpenCart: () => void;
}

/** Atalho fixo no canto: leva ao cardápio ou, com itens na sacola, abre a sacola. */
export default function FloatingCart({ cartCount, totalCents, onOpenCart }: FloatingCartProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = scrolled || cartCount > 0;

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 transition-all duration-300 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-12 opacity-0'
      }`}
    >
      {cartCount > 0 ? (
        <button
          type="button"
          onClick={onOpenCart}
          className="btn-primary !px-5 !py-3.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8)]"
        >
          <ShoppingBag size={18} />
          Ver sacola ({cartCount}) · {formatBRL(totalCents)}
        </button>
      ) : (
        <a
          href="#cardapio"
          className="btn-primary !px-5 !py-3.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.8)]"
        >
          <ShoppingBag size={18} />
          Fazer pedido
        </a>
      )}
    </div>
  );
}
