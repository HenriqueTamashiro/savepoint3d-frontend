import { useRef } from "react";
import { Product } from "../../types/product";
import { formatPrice } from "../ProductCard/handler";
import styles from "../../style/components/PremiumCollection";

interface PremiumCollectionProps {
  products: Product[];
}

export default function PremiumCollection({ products }: PremiumCollectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) =>
    carouselRef.current?.scrollBy({
      left: 340 * direction,
      behavior: "smooth",
    });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.sectionNumber}>07 —</span>
          <h2>
            Colecionáveis
            <br />
            Premium.
          </h2>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => scroll(-1)} aria-label="Colecionável anterior">
            ←
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Próximo colecionável">
            →
          </button>
        </div>
      </div>
      <div ref={carouselRef} className={styles.carousel}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={product.imageUrl} alt={product.alt} loading="lazy" />
            </div>
            <h3>{product.name}</h3>
            <div className={styles.meta}>
              <span>{product.scale} · {product.material}</span>
              <span>{product.categoryLabel}</span>
              <span className={styles.availability}>
                {product.stock === 0 ? "Esgotado" : product.stock === null ? "Sob encomenda" : "Disponível"}
              </span>
            </div>
            <span className={styles.price}>{formatPrice(product.price)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
