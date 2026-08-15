import { useColecaoPage, FILTERS } from './handler';
import ProductCard from '../../components/ProductCard';
import { Post } from '../../types/post';
import styles from '../../style/pages/Colecao.module.css';

interface ColecaoProps {
  onAddToCart: (id: string) => void;
}

interface DioramaSectionProps {
  projects?: Post[];
}

export function DioramaSection({ projects = [] }: DioramaSectionProps) {
  const project = projects.find((item) => item.tag?.toUpperCase() === 'DIORAMA');

  return (
    <section className={styles.dioramaHero} id="dioramas">
      <img src={project?.imageUrl ?? "/assets/img/7.png"} alt={project?.title ?? "Diorama colecionável Save Point3D"} />
      <div className={styles.dioramaOverlay} />
      <div className={styles.dioramaContent}>
        <span className={styles.sectionNumber}>08 —</span>
        <h2>{project?.title ?? "Uma cena inteira na sua estante."}</h2>
        <p>{project?.content ?? "Dioramas desenvolvidos para transformar momentos épicos em peças colecionáveis cheias de movimento, profundidade e detalhes."}</p>
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
