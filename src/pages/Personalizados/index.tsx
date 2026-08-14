import { CUSTOM_STEPS } from "./handler";
import styles from "../../style/pages/Personalizados.module.css";
import { Post } from "../../types/post";

interface CustomProps {
  article: Post[];
}

export default function Personalizados({ article }: CustomProps) {
  const item = article.find((item) => item.type === "ARTICLE");
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.sectionNumber}>05 —</span>

        <h2>{item?.title}</h2>
        <p>{item?.content}</p>
        <a href="/contato" className={styles.ctaButton}>
          Solicitar orçamento
        </a>
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
        <img
          src={item?.imageUrl ?? "IMG"}
          alt="Guerreiro estilizado em armadura escura, referência para peças personalizadas"
        />
      </div>
    </section>
  );
}
