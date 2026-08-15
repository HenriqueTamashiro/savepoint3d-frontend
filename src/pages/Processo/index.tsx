import { PROCESS_STEPS } from './handler';
import { Post } from '../../types/post';
import styles from '../../style/pages/Processo.module.css';

interface ProcessoProps {
  projects?: Post[];
}

export default function Processo({ projects = [] }: ProcessoProps) {
  const project = projects.find((item) => item.tag?.toUpperCase() === 'PROCESSO');

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.sectionNumber}>09 —</span>
        <h2>{project?.title ?? "Do arquivo digital até a sua estante."}</h2>
        <div className={styles.steps}>
          {PROCESS_STEPS.map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepNumber}>{s.n}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.imageWrap}>
        <img src={project?.imageUrl ?? "/assets/img/processo-artesao.png"} alt={project?.title ?? "Processo de acabamento manual"} />
      </div>
    </section>
  );
}
