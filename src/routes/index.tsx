import { Route, Routes } from "react-router-dom";

import RequireAuth from "../components/RequireAuth";
import ProductDetail from "../components/ProductDetail";

import Account from "../pages/Account";
import Auth from "../pages/Auth";
import Checkout from "../pages/Checkout";
import Colecao from "../pages/Colecao";
import Contato from "../pages/Contato";
import Home from "../pages/Home";
import Personalizados from "../pages/Personalizados";
import Processo from "../pages/Processo";
import Products from "../pages/Products";
import { CartLine, Product } from "../types/product";

interface AppRoutesProps {
  cart: CartLine[];
  products: Product[];
  couponCode: string;
  onAddToCart: (id: string, quantity: number) => void;
  onCheckoutComplete: () => void;
}

export default function AppRoutes({
  cart,
  products,
  couponCode,
  onAddToCart,
  onCheckoutComplete,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home onAddToCart={onAddToCart} />} />

      <Route path="/personalizados" element={<Personalizados />} />

      <Route path="/colecao" element={<Colecao onAddToCart={onAddToCart} />} />

      <Route path="/processo" element={<Processo />} />

      <Route path="/contato" element={<Contato />} />

      <Route
        path="/produtos"
        element={<Products products={products} onAddToCart={onAddToCart} />}
      />

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
              onComplete={onCheckoutComplete}
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

      <Route
        path="/products/:productId"
        element={
          <ProductDetail products={products} onAddToCart={onAddToCart} />
        }
      />
    </Routes>
  );
}
