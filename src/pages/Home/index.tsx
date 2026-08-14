import { useFeaturedCarousel, useHomePage, postManager } from "./handler";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import StyledFigures from "../../components/StyledFigures";
import PremiumCollection from "../../components/PremiumCollection";
import StatsSection from "../../components/StatsSection";
import Personalizados from "../Personalizados";
import Processo from "../Processo";
import Contato from "../Contato";
import { DioramaSection, LancamentosSection } from "../Colecao";
import styles from "../../style/pages/Home.module.css";

interface HomeProps {
  onAddToCart: (id: string) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const { destaques, postsByType } = useHomePage();
  const {
    CATEGORY: category,
    ARTICLE: articles,
    PRODUCT: productPosts,
    FIGURE: figure,
    PROJECT: project,
    VIDEO: video,
  } = postsByType;

  const { trackRef, canScrollPrevious, canScrollNext, scrollOneItem } =
    useFeaturedCarousel(destaques.length);

  return (
    <>
      <section id="top" className={styles.hero}>
        <video
          src="/assets/video/hero-video.mp4"
          poster="/assets/img/4.png"
          autoPlay
          loop
          muted
          playsInline
          className={styles.heroVideo}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroKicker}>Save Point3D — Coleção 2026</span>
          <h1>
            Seu Universo
            <br />
            Favorito
            <br />
            Fora da Tela.
          </h1>
          <p>
            Action figures, estátuas e peças personalizadas produzidas em
            impressão 3D e finalizadas à mão.
          </p>
          <div className={styles.heroActions}>
            <a href="#destaques" className={styles.primaryButton}>
              Explorar coleção
            </a>
            <a href="/personalizados" className={styles.secondaryButton}>
              Criar peça personalizada
            </a>
          </div>
        </div>
      </section>

      <section id="destaques" className={styles.destaques}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionNumber}>03 —</span>
            <h2>
              Destaques
              <br />
              da coleção.
            </h2>
          </div>
          <p>
            Peças selecionadas pelo estúdio — do guerreiro clássico à edição
            totalmente personalizada.
          </p>
        </div>
        <div className={styles.destaquesCarousel}>
          <div ref={trackRef} className={styles.destaquesGrid}>
            {destaques.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                variant="light"
              />
            ))}
          </div>

          <button
            type="button"
            className={`${styles.carouselControl} ${styles.carouselControlPrevious}`}
            aria-label="Mostrar produtos anteriores"
            disabled={!canScrollPrevious}
            onClick={() => scrollOneItem(-1)}
          >
            &#8249;
          </button>

          <button
            type="button"
            className={`${styles.carouselControl} ${styles.carouselControlNext}`}
            aria-label="Mostrar próximos produtos"
            disabled={!canScrollNext}
            onClick={() => scrollOneItem(1)}
          >
            &#8250;
          </button>
        </div>
      </section>

      <section id="categorias" className={styles.categorias}>
        <h2>
          Encontre seu
          <br />
          próximo checkpoint.
        </h2>
        <div className={styles.categoriasGrid}>
          {category.map((post, index) => (
            <CategoryCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      <div id="personalizados">
        <Personalizados article={articles} />
      </div>
      <StyledFigures figures={figure} />
      <PremiumCollection />
      <DioramaSection />
      <div id="processo">
        <Processo />
      </div>
      <LancamentosSection onAddToCart={onAddToCart} />
      <div id="experiencia">
        <Contato />
      </div>
      <StatsSection />
    </>
  );
}
