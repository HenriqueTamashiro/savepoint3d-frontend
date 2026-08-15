import { CUSTOM_STEPS } from "./handler";
import styles from "../../style/pages/Personalizados.module.css";
import { Post } from "../../types/post";

interface CustomProps {
  article?: Post[];
}

export default function Personalizados({ article = [] }: CustomProps) {
  const item = article.find((item) => item.tag?.toUpperCase() === "PERSONALIZADOS") ?? article[0];
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <span className={styles.sectionNumber}>05 —</span>

        <h2>{item?.title ?? "Sua ideia. Seu personagem. Sua peça."}</h2>
        <p>
          {item?.content ??
            "Transformamos fotos, personagens, referências e ideias em peças exclusivas produzidas especialmente para você."}
        </p>
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
          src={item?.imageUrl ?? "/assets/img/personalizados-hero.png"}
          alt="Guerreiro estilizado em armadura escura, referência para peças personalizadas"
        />
      </div>
    </section>
  );
}
