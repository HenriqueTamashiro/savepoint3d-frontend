import styles from '../../style/components/StatsSection.module.css';

const STATS = [
  { value: '+150', label: 'Peças produzidas' },
  { value: '+80', label: 'Colecionadores atendidos' },
  { value: '100%', label: 'Acabamento manual' },
  { value: '01', label: 'Peça criada especialmente para você' },
];

export default function StatsSection() {
  return (
    <section className={styles.section} aria-label="Números da Save Point3D">
      <div className={styles.grid}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.value}>{stat.value}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
