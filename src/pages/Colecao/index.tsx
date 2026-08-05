import { useColecaoPage, FILTERS } from './handler';
import ProductCard from '../../components/ProductCard';
import styles from '../../style/pages/Colecao.module.css';

interface ColecaoProps {
  onAddToCart: (id: string) => void;
}

export function DioramaSection() {
  return (
    <section className={styles.dioramaHero} id="dioramas">
      <img src="/assets/img/7.png" alt="Diorama de guerreiro sombrio empunhando espada e troféu, peça colecionável Save Point3D" />
      <div className={styles.dioramaOverlay} />
      <div className={styles.dioramaContent}>
        <span className={styles.sectionNumber}>08 —</span>
        <h2>Uma cena inteira<br />na sua estante.</h2>
        <p>Dioramas desenvolvidos para transformar momentos épicos em peças colecionáveis cheias de movimento, profundidade e detalhes.</p>
        <a href="#lancamentos" className={styles.ctaButton}>Explorar dioramas</a>
      </div>
    </section>
  );
}

export function LancamentosSection({ onAddToCart }: ColecaoProps) {
  const { filtered, activeFilter, setActiveFilter } = useColecaoPage();

  return (
    <section id="lancamentos" className={styles.section}>
      <h2>Novos checkpoints<br />desbloqueados.</h2>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`${styles.filterButton} ${activeFilter === f.value ? styles.active : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} variant="dark" />
        ))}
      </div>
    </section>
  );
}

export default function Colecao({ onAddToCart }: ColecaoProps) {
  return (
    <>
      <DioramaSection />
      <LancamentosSection onAddToCart={onAddToCart} />
    </>
  );
}
