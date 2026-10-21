import { useCallback, useState } from 'react';
import About from '@/components/About';
import CallToAction from '@/components/CallToAction';
import CartDrawer from '@/components/CartDrawer';
import ComboHighlight from '@/components/ComboHighlight';
import Contact from '@/components/Contact';
import FloatingCart from '@/components/FloatingCart';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Menu from '@/components/Menu';
import Reviews from '@/components/Reviews';
import { useCart } from '@/hooks/useCart';
import { useCatalog } from '@/hooks/useCatalog';

function App() {
  const { catalog } = useCatalog();
  const cart = useCart(catalog);
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const addAndOpen = (id: string) => {
    cart.add(id);
    openCart();
  };

  return (
    <div className="min-h-screen bg-gf-black font-sans text-white">
      <Header cartCount={cart.count} onOpenCart={openCart} />
      <main>
        <Hero onAdd={addAndOpen} />
        <Marquee />
        <About />
        <Menu onAdd={cart.add} />
        <ComboHighlight onAdd={addAndOpen} />
        <Gallery />
        <Reviews />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
      <FloatingCart cartCount={cart.count} totalCents={cart.totalCents} onOpenCart={openCart} />

      {cartOpen && (
        <CartDrawer
          lines={cart.lines}
          totalCents={cart.totalCents}
          onChangeQuantity={cart.changeQuantity}
          onClear={cart.clear}
          onClose={closeCart}
        />
      )}
    </div>
  );
}

export default App;
