import { Post } from "../../types/post";
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

export default function StyledFigures({ figures = [] }: StyledFiguresProps) {
  return (
    <>
      {figures.map((item) => (
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
