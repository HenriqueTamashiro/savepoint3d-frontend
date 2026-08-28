import { CUSTOM_STEPS } from "./handler";
import * as S from "../../style/pages/Personalizados.styles";
import { Post } from "../../types/post";

interface CustomProps {
  article?: Post[];
}

export default function Personalizados({ article = [] }: CustomProps) {
  const item = article.find((item) => item.tag?.toUpperCase() === "PERSONALIZADOS") ?? article[0];
  return (
    <S.Section>
      <S.Content>
        <S.SectionNumber>05 —</S.SectionNumber>

        <h2>{item?.title ?? "Sua ideia. Seu personagem. Sua peça."}</h2>
        <p>
          {item?.content ??
            "Transformamos fotos, personagens, referências e ideias em peças exclusivas produzidas especialmente para você."}
        </p>
        <S.CtaButton href="/contato">
          Solicitar orçamento
        </S.CtaButton>
        <S.Steps>
          {CUSTOM_STEPS.map((s) => (
            <S.Step key={s.n}>
              <S.StepNumber>{s.n}</S.StepNumber>
              <span>{s.label}</span>
            </S.Step>
          ))}
        </S.Steps>
      </S.Content>
      <S.ImageWrap>
        <img
          src={item?.imageUrl ?? "/assets/img/personalizados-hero.png"}
          alt="Guerreiro estilizado em armadura escura, referência para peças personalizadas"
        />
      </S.ImageWrap>
    </S.Section>
  );
}
