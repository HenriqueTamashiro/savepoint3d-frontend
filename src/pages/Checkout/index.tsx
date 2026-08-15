import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orders";
import { CartLine, Product } from "../../types/product";
import { formatPrice } from "../../components/ProductCard/handler";
import styles from "../../style/pages/Checkout.module.css";

interface CheckoutProps {
  cart: CartLine[];
  products: Product[];
  couponCode: string;
  onComplete: () => void;
}

export default function Checkout({ cart, products, couponCode, onComplete }: CheckoutProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lines = useMemo(
    () => cart.flatMap((line) => {
      const product = products.find((item) => item.id === line.id);
      return product ? [{ ...line, product, lineTotal: product.price * line.qty }] : [];
    }),
    [cart, products],
  );
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const discount = couponCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  async function finishOrder() {
    setLoading(true);
    setError("");
    try {
      await createOrder(cart, couponCode);
      onComplete();
      navigate("/minha-conta", { replace: true, state: { tab: "orders", orderCreated: true } });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível finalizar o pedido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>SAVE POINT<span>3D</span></Link>
        <span>Checkout seguro</span>
      </header>
      <div className={styles.layout}>
        <section className={styles.content}>
          <span className={styles.eyebrow}>Seu pedido</span>
          <h1>Confirme seu próximo checkpoint.</h1>
          {lines.length === 0 ? (
            <div className={styles.empty}>
              <h2>Seu carrinho está vazio.</h2>
              <Link to="/colecao">Explorar coleção</Link>
            </div>
          ) : (
            <div className={styles.items}>
              {lines.map((line) => (
                <article key={line.id}>
                  <img src={line.product.imageUrl} alt={line.product.alt} />
                  <div><span>{line.product.categoryLabel}</span><h2>{line.product.name}</h2><p>{line.qty} × {formatPrice(line.product.price)}</p></div>
                  <strong>{formatPrice(line.lineTotal)}</strong>
                </article>
              ))}
            </div>
          )}
        </section>
        <aside className={styles.summary}>
          <span>Resumo</span>
          <h2>Total do pedido</h2>
          <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          {discount > 0 && <div className={styles.discount}><span>Cupom SAVE10</span><strong>− {formatPrice(discount)}</strong></div>}
          <div className={styles.total}><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <p>O estoque será reservado quando o pedido for confirmado.</p>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="button" disabled={loading || lines.length === 0} onClick={finishOrder}>
            {loading ? "Finalizando…" : "Confirmar pedido"}
          </button>
          <Link to="/colecao">← Continuar comprando</Link>
        </aside>
      </div>
    </main>
  );
}
