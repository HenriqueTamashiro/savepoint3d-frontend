import styles from '../../style/components/StyledFigures';

export default function StyledFigures() {
  return (
    <section className={styles.section}>
      <div className={styles.imageWrap}>
        <img
          src="/assets/img/3.png"
          alt="Figura estilizada colecionável em armadura roxa, exemplo de acabamento toy art"
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        <span className={styles.sectionNumber}>06 —</span>
        <h2>Pequenas no tamanho.<br />Gigantes na personalidade.</h2>
        <p>Personagens, profissões, casais e presentes ganham vida em figuras estilizadas — toy art e vinyl style feitos sob medida, com identidade só sua.</p>
        <a href="#experiencia" className={styles.ctaButton}>Criar minha figura</a>
      </div>
    </section>
  );
}
