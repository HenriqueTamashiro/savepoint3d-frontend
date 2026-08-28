import styles, { StyleScope } from '../../style/components/ReviewsSection';

const REVIEWS = [
  { name: 'Rafael M.', product: 'Crimson Ronin', stars: '★★★★★', comment: 'Acabamento impecável, muito acima do que eu esperava de uma peça sob encomenda.', date: '12/06/2026' },
  { name: 'Bianca C.', product: 'Aurora Sentinel', stars: '★★★★★', comment: 'Enviei uma referência bem específica e o resultado ficou fiel em cada detalhe.', date: '28/05/2026' },
  { name: 'Diego A.', product: 'Titan Mech', stars: '★★★★☆', comment: 'Peça grande, pesada, com pintura muito bem trabalhada nos detalhes metálicos.', date: '09/04/2026' },
];

export default function ReviewsSection() {
  return (<StyleScope>{(
    <section className={styles.section}>
      <h2>O que dizem os<br />colecionadores.</h2>
      <div className={styles.grid}>
        {REVIEWS.map((r) => (
          <div key={r.name} className={styles.card}>
            <span className={styles.stars}>{r.stars}</span>
            <p className={styles.comment}>&quot;{r.comment}&quot;</p>
            <div className={styles.footer}>
              <div>
                <span className={styles.name}>{r.name}</span>
                <span className={styles.product}>{r.product}</span>
              </div>
              <span className={styles.date}>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )}</StyleScope>);
}
