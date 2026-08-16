import { Post, PostType } from "../../types/post";
import {
  Content,
  CtaButton,
  Description,
  FigureImage,
  ImageWrap,
  Section,
  SectionNumber,
  Title,
} from "./styles";

interface StyledFiguresProps {
  figures?: Post[];
}

const DEFAULT_FIGURE: Post = {
  id: "default-styled-figure",
  authorId: "local",
  title: "Pequenas no tamanho.\nGigantes na personalidade.",
  content:
    "Personagens, profissões, casais e presentes ganham vida em figuras estilizadas — toy art e vinyl style feitos sob medida, com identidade só sua.",
  type: PostType.FIGURE,
  tag: "FIGURAS",
  imageUrl: "/assets/img/3.png",
  show: true,
};

export default function StyledFigures({ figures = [] }: StyledFiguresProps) {
  const visibleFigures = figures.filter(
    (item) => item.type === PostType.FIGURE && item.show !== false,
  );
  const items = visibleFigures.length > 0 ? visibleFigures : [DEFAULT_FIGURE];

  return (
    <>
      {items.map((item) => (
        <Section key={item.id}>
          <ImageWrap>
            <FigureImage
              src={item.imageUrl ?? "/assets/img/3.png"}
              alt={item.title}
              loading="lazy"
            />
          </ImageWrap>

          <Content>
            <SectionNumber>06 —</SectionNumber>
            <Title>{item.title}</Title>
            <Description>{item.content}</Description>
            <CtaButton href="#experiencia">Criar minha figura</CtaButton>
          </Content>
        </Section>
      ))}
    </>
  );
}
