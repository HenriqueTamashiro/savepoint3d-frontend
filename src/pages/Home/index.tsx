import { useFeaturedCarousel, useHomePage } from "./handler";
import ProductCard from "../../components/ProductCard";
import CategoryCard from "../../components/CategoryCard";
import StyledFigures from "../../components/StyledFigures";
import PremiumCollection from "../../components/PremiumCollection";
import StatsSection from "../../components/StatsSection";
import Personalizados from "../Personalizados";
import Processo from "../Processo";
import Contato from "../Contato";
import { DioramaSection, LancamentosSection } from "../Colecao";
import * as S from "../../style/pages/Home.styles";

interface HomeProps {
  onAddToCart: (id: string) => void;
}

export default function Home({ onAddToCart }: HomeProps) {
  const { destaques, products, postsByType } = useHomePage();
  const {
    CATEGORY: category,
    ARTICLE: articles,
    FIGURE: figure,
    PROJECT: project,
    VIDEO: video,
  } = postsByType;
  const hero = video.find((item) => item.tag?.toUpperCase() === "HERO") ?? video[0];

  const { trackRef, canScrollPrevious, canScrollNext, scrollOneItem } =
    useFeaturedCarousel(destaques.length);

  return (<S.StyleScope>{(
    <>
      <S.Hero id="top">
        <S.HeroVideo
          src={hero?.url ?? "/assets/video/hero-video.mp4"}
          poster={hero?.imageUrl ?? "/assets/img/4.png"}
          autoPlay
          loop
          muted
          playsInline
        />
        <S.HeroOverlay />
        <S.HeroContent>
          <S.HeroKicker>Save Point3D — Coleção 2026</S.HeroKicker>
          <h1>{hero?.title ?? "Seu Universo Favorito Fora da Tela."}</h1>
          <p>
            {hero?.content ??
              "Action figures, estátuas e peças personalizadas produzidas em impressão 3D e finalizadas à mão."}
          </p>
          <S.HeroActions>
            <S.PrimaryButton href="#destaques">
              Explorar coleção
            </S.PrimaryButton>
            <S.SecondaryButton href="/personalizados">
              Criar peça personalizada
            </S.SecondaryButton>
          </S.HeroActions>
        </S.HeroContent>
      </S.Hero>

      <S.Destaques id="destaques">
        <S.SectionHeader>
          <div>
            <S.SectionNumber>03 —</S.SectionNumber>
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
        </S.SectionHeader>
        <S.DestaquesCarousel>
          <S.DestaquesGrid ref={trackRef}>
            {destaques.map((p) => (
              <S.CarouselItem key={p.id}>
                <ProductCard
                  product={p}
                  onAddToCart={onAddToCart}
                  variant="light"
                />
              </S.CarouselItem>
            ))}
          </S.DestaquesGrid>

          <S.CarouselControl
            type="button"
            $direction="previous"
            aria-label="Mostrar produtos anteriores"
            disabled={!canScrollPrevious}
            onClick={() => scrollOneItem(-1)}
          >
            &#8249;
          </S.CarouselControl>

          <S.CarouselControl
            type="button"
            $direction="next"
            aria-label="Mostrar próximos produtos"
            disabled={!canScrollNext}
            onClick={() => scrollOneItem(1)}
          >
            &#8250;
          </S.CarouselControl>
        </S.DestaquesCarousel>
      </S.Destaques>

      <S.Categorias id="categorias">
        <h2>
          Encontre seu
          <br />
          próximo checkpoint.
        </h2>
        <S.CategoriasGrid>
          {category.map((post, index) => (
            <CategoryCard key={post.id} post={post} index={index} />
          ))}
        </S.CategoriasGrid>
      </S.Categorias>

      <div id="personalizados">
        <Personalizados article={articles} />
      </div>
      <StyledFigures figures={figure} />
      <PremiumCollection products={products} />
      <DioramaSection projects={project} />
      <div id="processo">
        <Processo projects={project} />
      </div>
      <LancamentosSection onAddToCart={onAddToCart} />
      <div id="experiencia">
        <Contato />
      </div>
      <StatsSection />
    </>
  )}</S.StyleScope>);
}
