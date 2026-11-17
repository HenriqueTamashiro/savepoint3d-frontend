import styles, { StyleScope } from "../../style/components/CategoryCard";

export default function TestCard() {
  return (
    <StyleScope>
      <span className={styles.index}></span>

      <div className={styles.footer}>
        <h3 className={styles.name}>A</h3>
        <span className={styles.arrow}>→</span>
      </div>
    </StyleScope>
  );
}
