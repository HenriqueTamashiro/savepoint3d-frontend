import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Newsletter from "./components/Newsletter";
import ReviewsSection from "./components/ReviewsSection";
import InstagramGrid from "./components/InstagramGrid";
import AppRoutes from "./routes";
import { CartLine, Product } from "./types/product";
import { fetchProducts } from "./services/api";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPrivateSurface = [
    "/dashboard",
    "/minha-conta",
    "/checkout",
    "/login",
    "/cadastro",
  ].some((path) => location.pathname.startsWith(path));
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(
        window.localStorage.getItem("savepoint3d:cart") ?? "[]",
      ) as CartLine[];
    } catch {
      return [];
    }
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
        const productIds = new Set(
          fetchedProducts.map((product) => product.id),
        );
        setCart((current) => current.filter((line) => productIds.has(line.id)));
      })
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("savepoint3d:cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(id: string, quantity: number) {
    const product = products.find((item) => item.id === id);
    if (product?.stock === 0) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (
        product?.stock !== null &&
        product?.stock !== undefined &&
        existing &&
        existing.qty >= product.stock
      )
        return prev;
      return existing
        ? prev.map((c) => (c.id === id ? { ...c, qty: c.qty + quantity } : c))
        : [...prev, { id, qty: quantity }];
    });
    setCartOpen(true);
  }

  function incQty(id: string) {
    const product = products.find((item) => item.id === id);
    setCart((prev) =>
      prev.map((c) =>
        c.id === id &&
        (product?.stock === null || c.qty < (product?.stock ?? 0))
          ? { ...c, qty: c.qty + 1 }
          : c,
      ),
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
    <>
      {!isPrivateSurface && (
        <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      )}
      <AppRoutes
        cart={cart}
        products={products}
        couponCode={couponCode}
        onAddToCart={addToCart}
        onCheckoutComplete={() => {
          setCart([]);
          setCouponCode("");
        }}
      />
      {!isPrivateSurface && (
        <>
          <ReviewsSection />
          <InstagramGrid />
          <Newsletter />
          <Footer />
          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            products={products}
            onIncQty={incQty}
            onDecQty={decQty}
            onRemove={removeFromCart}
            couponCode={couponCode}
            onCouponApplied={setCouponCode}
            onCheckout={() => {
              setCartOpen(false);
              navigate("/checkout");
            }}
          />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
