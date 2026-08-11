import styles from '../../style/components/InstagramGrid';

const TILES = [
  { image: '/assets/img/1.png', alt: 'Detalhe de pintura em Crimson Ronin', position: 'center 20%' },
  { image: '/assets/img/6.png', alt: 'Peça finalizada Titan Mech', position: 'center top' },
  { image: '/assets/img/3.png', alt: 'Bastidor de acabamento Neon Huntress', position: 'center 15%' },
  { image: '/assets/img/5.png', alt: 'Detalhe da base personalizada Save Point3D', position: 'bottom center' },
  { image: '/assets/img/7.png', alt: 'Peça finalizada Shadow Knight', position: 'center 25%' },
  { image: '/assets/img/4.png', alt: 'Bastidor de estúdio Save Point3D', position: '70% center' },
];

export default function InstagramGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2>Acompanhe<br />nosso processo.</h2>
        <a href="https://instagram.com/savepoint3d" target="_blank" rel="noopener noreferrer">@savepoint3d — Seguir</a>
      </div>
      <div className={styles.grid}>
        {TILES.map((t) => (
          <div key={t.alt} className={styles.tile}>
            <img src={t.image} alt={t.alt} loading="lazy" style={{ objectPosition: t.position }} />
          </div>
        ))}
      </div>
    </section>
  );
}
