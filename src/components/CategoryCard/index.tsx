import styles from "../../style/components/CategoryCard.module.css";

interface CategoryCardProps {
  index: string;
  name: string;
  imageUrl?: string | null;
  href: string;
  tall?: boolean;
}

export default function CategoryCard({
  index,
  name,
  imageUrl,
  href,
  tall,
}: CategoryCardProps) {
  return (
    <a href={href} className={`${styles.card} ${tall ? styles.tall : ""}`}>
      {imageUrl && (
        <img src={imageUrl} alt="" loading="lazy" className={styles.bgImage} />
      )}
      <span className={styles.index}>{index}</span>
      <div className={styles.footer}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.arrow}>→</span>
      </div>
    </a>
  );
}
