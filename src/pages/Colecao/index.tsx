import { useColecaoPage, FILTERS } from "./handler";
import ProductCard from "../../components/ProductCard";
import { Post } from "../../types/post";
import * as S from "../../style/pages/Colecao.styles";

interface ColecaoProps {
  onAddToCart: (id: string, quantity: number) => void;
}

interface DioramaSectionProps {
  projects?: Post[];
}

export function DioramaSection({ projects = [] }: DioramaSectionProps) {
  const project = projects.find(
    (item) => item.tag?.toUpperCase() === "DIORAMA",
  );

  return (
    <S.DioramaHero id="dioramas">
      <img
        src={project?.imageUrl ?? "/assets/img/7.png"}
        alt={project?.title ?? "Diorama colecionável Save Point3D"}
      />
      <S.DioramaOverlay />
      <S.DioramaContent>
        <S.SectionNumber>08 —</S.SectionNumber>
        <h2>{project?.title ?? "Uma cena inteira na sua estante."}</h2>
        <p>
          {project?.content ??
            "Dioramas desenvolvidos para transformar momentos épicos em peças colecionáveis cheias de movimento, profundidade e detalhes."}
        </p>
        <S.CtaButton href="#lancamentos">Explorar dioramas</S.CtaButton>
      </S.DioramaContent>
    </S.DioramaHero>
  );
}

export function LancamentosSection({ onAddToCart }: ColecaoProps) {
  const { filtered, activeFilter, setActiveFilter } = useColecaoPage();

  return (
    <S.Section id="lancamentos">
      <h2>
        Novos checkpoints
        <br />
        desbloqueados.
      </h2>
      <S.Filters>
        {FILTERS.map((f) => (
          <S.FilterButton
            key={f.value}
            type="button"
            $active={activeFilter === f.value}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </S.FilterButton>
        ))}
      </S.Filters>
      <S.Grid>
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={onAddToCart}
            variant="dark"
          />
        ))}
      </S.Grid>
    </S.Section>
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
