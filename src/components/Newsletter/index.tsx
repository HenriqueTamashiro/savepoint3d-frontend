import { useNewsletter } from './handler';
import styles from '../../style/components/Newsletter';

export default function Newsletter() {
  const { email, setEmail, submitted, handleSubmit } = useNewsletter();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2>Não perca o<br />próximo lançamento.</h2>
        <p>Lançamentos, pré-vendas e edições limitadas direto no seu e-mail.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Quero receber</button>
        </form>
        {submitted && <span className={styles.confirmation}>Inscrito! Você vai saber de tudo em primeira mão.</span>}
      </div>
    </section>
  );
}
