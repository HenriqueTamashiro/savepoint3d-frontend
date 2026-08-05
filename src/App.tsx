import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Newsletter from "./components/Newsletter";
import ReviewsSection from "./components/ReviewsSection";
import InstagramGrid from "./components/InstagramGrid";
import Home from "./pages/Home";
import Personalizados from "./pages/Personalizados";
import Colecao from "./pages/Colecao";
import Processo from "./pages/Processo";
import Contato from "./pages/Contato";
import { CartLine } from "./types/product";
import { PRODUCTS } from "./data/products";
import "./style/global.css";

export default function App() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      return existing
        ? prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { id, qty: 1 }];
    });
    setCartOpen(true);
  }

  function incQty(id: string) {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)),
    );
  }

  function decQty(id: string) {
    setCart((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, qty: Math.max(1, c.qty - 1) } : c,
      ),
    );
  }
  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/personalizados" element={<Personalizados />} />
        <Route path="/colecao" element={<Colecao onAddToCart={addToCart} />} />
        <Route path="/processo" element={<Processo />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <ReviewsSection />
      <InstagramGrid />
      <Newsletter />
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        products={PRODUCTS}
        onIncQty={incQty}
        onDecQty={decQty}
        onRemove={removeFromCart}
      />
    </BrowserRouter>
  );
}
