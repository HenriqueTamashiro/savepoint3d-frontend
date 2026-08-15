import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
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
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import RequireAuth from "./components/RequireAuth";
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

  function addToCart(id: string) {
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
        ? prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
        : [...prev, { id, qty: 1 }];
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
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/personalizados" element={<Personalizados />} />
        <Route path="/colecao" element={<Colecao onAddToCart={addToCart} />} />
        <Route path="/processo" element={<Processo />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/cadastro" element={<Auth mode="register" />} />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout
                cart={cart}
                products={products}
                couponCode={couponCode}
                onComplete={() => {
                  setCart([]);
                  setCouponCode("");
                }}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/minha-conta"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth roles={["ADMIN"]}>
              <Account initialTab="admin" />
            </RequireAuth>
          }
        />
      </Routes>
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
