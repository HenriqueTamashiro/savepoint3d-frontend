import styles from "../../style/components/StyledFigures";
import { Post } from "../../types/post";

interface CustomProps {
  figures: Post[];
}

export default function StyledFigures({ figures }: CustomProps) {
  return (
    <>
      {figures.map((item) => (
        <section key={item.id} className={styles.section}>
          <div className={styles.imageWrap}>
            <img
              src={item.imageUrl ?? "/assets/img/3.png"}
              alt={item.title}
              loading="lazy"
            />
          </div>

          <div className={styles.content}>
            <span className={styles.sectionNumber}>06 —</span>
            <h2>{item.title}</h2>
            <p>{item.content}</p>

            <a href="#experiencia" className={styles.ctaButton}>
              Criar minha figura
            </a>
          </div>
        </section>
      ))}
    </>
  );
}
