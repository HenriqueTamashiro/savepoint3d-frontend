import { useRef } from 'react';
import styles from '../../style/components/PremiumCollection.module.css';

const PREMIUM = [
  { name: 'Crimson Ronin', scale: 'Escala 1/6', material: 'PLA de alta qualidade', edition: '12/50', availability: 'Disponível', price: 'R$ 899,90', image: '/assets/img/1.png', alt: 'Crimson Ronin em exibição premium' },
  { name: 'Titan Mech', scale: 'Escala 1/12', material: 'PLA de alta qualidade + metal', edition: '04/30', availability: 'Últimas unidades', price: 'R$ 1.599,90', image: '/assets/img/6.png', alt: 'Titan Mech em exibição premium' },
  { name: 'Shadow Knight', scale: 'Escala 1/6', material: 'PLA de alta qualidade', edition: '08/40', availability: 'Disponível', price: 'R$ 1.099,90', image: '/assets/img/7.png', alt: 'Shadow Knight em exibição premium' },
];

export default function PremiumCollection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => carouselRef.current?.scrollBy({ left: 340 * direction, behavior: 'smooth' });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.sectionNumber}>07 —</span>
          <h2>Colecionáveis<br />Premium.</h2>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => scroll(-1)} aria-label="Colecionável anterior">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Próximo colecionável">→</button>
        </div>
      </div>
      <div ref={carouselRef} className={styles.carousel}>
        {PREMIUM.map((product) => (
          <article key={product.name} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={product.image} alt={product.alt} loading="lazy" />
            </div>
            <h3>{product.name}</h3>
            <div className={styles.meta}>
              <span>{product.scale} · {product.material}</span>
              <span>Edição {product.edition}</span>
              <span className={styles.availability}>{product.availability}</span>
            </div>
            <span className={styles.price}>{product.price}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
