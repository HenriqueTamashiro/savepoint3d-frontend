import { Product } from "../../types/product";
import { useProductCardHover, formatPrice } from "./handler";
import styles from "../../style/components/ProductCard";

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
  variant?: "light" | "dark";
}

export default function ProductCard({
  product,
  onAddToCart,
  variant = "dark",
}: ProductCardProps) {
  const { hovered, onMouseEnter, onMouseLeave } = useProductCardHover();

  return (
    <article
      className={`${styles.card} ${variant === "light" ? styles.light : styles.dark} ${hovered ? styles.hovered : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.imageWrap}>
        <div className={styles.glow} />
        <img
          src={product.imageUrl}
          alt={product.alt}
          loading="lazy"
          className={styles.image}
        />
        <span className={styles.tag}>{product.tag}</span>
        <span className={styles.stock}>{product.stock} Uni.</span>
      </div>
      <div className={styles.body}>
        <span className={styles.meta}>
          {product.categoryLabel} · {product.scale}
        </span>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.material}>{product.material}</span>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            className={styles.addButton}
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
