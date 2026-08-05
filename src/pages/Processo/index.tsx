import { PROCESS_STEPS } from './handler';
import styles from '../../style/pages/Processo.module.css';

export default function Processo() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.sectionNumber}>09 —</span>
        <h2>Do arquivo digital<br />até a sua estante.</h2>
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
        <img src="/assets/img/processo-artesao.png" alt="Guerreiro em armadura escura em estúdio, representando o cuidado do acabamento manual" />
      </div>
    </section>
  );
}
