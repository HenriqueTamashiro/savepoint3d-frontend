import { CUSTOM_STEPS } from './handler';
import styles from '../../style/pages/Personalizados.module.css';

export default function Personalizados() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.sectionNumber}>05 —</span>
        <h2>Sua ideia.<br />Seu personagem.<br />Sua peça.</h2>
        <p>Transformamos fotos, personagens, referências e ideias em peças exclusivas produzidas especialmente para você.</p>
        <a href="/contato" className={styles.ctaButton}>Solicitar orçamento</a>
        <div className={styles.steps}>
          {CUSTOM_STEPS.map((s) => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepNumber}>{s.n}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.imageWrap}>
        <img src="/assets/img/personalizados-hero.png" alt="Guerreiro estilizado em armadura escura, referência para peças personalizadas" />
      </div>
    </section>
  );
}
