import { PROCESS_STEPS } from './handler';
import { Post } from '../../types/post';
import * as S from "../../style/pages/Processo.styles";

interface ProcessoProps {
  projects?: Post[];
}

export default function Processo({ projects = [] }: ProcessoProps) {
  const project = projects.find((item) => item.tag?.toUpperCase() === 'PROCESSO');

  return (
    <S.Section>
      <S.Content>
        <S.SectionNumber>09 —</S.SectionNumber>
        <h2>{project?.title ?? "Do arquivo digital até a sua estante."}</h2>
        <S.Steps>
          {PROCESS_STEPS.map((s) => (
            <S.Step key={s.n}>
              <S.StepNumber>{s.n}</S.StepNumber>
              <span>{s.label}</span>
            </S.Step>
          ))}
        </S.Steps>
      </S.Content>
      <S.ImageWrap>
        <img src={project?.imageUrl ?? "/assets/img/processo-artesao.png"} alt={project?.title ?? "Processo de acabamento manual"} />
      </S.ImageWrap>
    </S.Section>
  );
}
