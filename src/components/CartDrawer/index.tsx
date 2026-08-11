import { CartLine, Product } from "../../types/product";
import { useCartDrawer } from "./handler";
import { formatPrice } from "../ProductCard/handler";
import styles from "../../style/components/CartDrawer";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartLine[];
  products: Product[];
  onIncQty: (id: string) => void;
  onDecQty: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({
  open,
  onClose,
  cart,
  products,
  onIncQty,
  onDecQty,
  onRemove,
}: CartDrawerProps) {
  const {
    lines,
    subtotal,
    couponCode,
    setCouponCode,
    couponMessage,
    applyCoupon,
  } = useCartDrawer(cart, products, onIncQty, onDecQty, onRemove);

  return (
    <>
      {open && <div className={styles.overlay} onClick={onClose} />}
      <aside
        className={`${styles.drawer} ${open ? styles.open : ""}`}
        aria-label="Carrinho de compras"
      >
        <div className={styles.header}>
          <h2>Carrinho ({cart.reduce((s, c) => s + c.qty, 0)})</h2>
          <button type="button" onClick={onClose} aria-label="Fechar carrinho">
            ✕
          </button>
        </div>

        <div className={styles.items}>
          {lines.length === 0 && (
            <p className={styles.empty}>Seu carrinho está vazio.</p>
          )}
          {lines.map((line) => (
            <div key={line.id} className={styles.item}>
              <div className={styles.itemImage}>
                <img src={line.product.imageUrl} alt={line.product.name} />
              </div>
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{line.product.name}</span>
                <span className={styles.itemCategory}>
                  {line.product.categoryLabel}
                </span>
                <div className={styles.qtyRow}>
                  <button type="button" onClick={() => onDecQty(line.id)}>
                    −
                  </button>
                  <span>{line.qty}</span>
                  <button type="button" onClick={() => onIncQty(line.id)}>
                    +
                  </button>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => onRemove(line.id)}
                  >
                    remover
                  </button>
                </div>
              </div>
              <span className={styles.itemTotal}>
                {formatPrice(line.lineTotal)}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.couponRow}>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Cupom de desconto"
            />
            <button type="button" onClick={applyCoupon}>
              Aplicar
            </button>
          </div>
          {couponMessage && (
            <span className={styles.couponMessage}>{couponMessage}</span>
          )}
          <div className={styles.subtotalRow}>
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <a href="/checkout" className={styles.checkoutButton}>
            Finalizar compra
          </a>
          <button
            type="button"
            onClick={onClose}
            className={styles.continueButton}
          >
            Continuar comprando
          </button>
        </div>
      </aside>
    </>
  );
}
