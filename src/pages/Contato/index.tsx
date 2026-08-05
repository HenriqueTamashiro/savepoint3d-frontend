import { useContatoPage } from './handler';
import styles from '../../style/pages/Contato.module.css';

export default function Contato() {
  const { form, setField, setReferenceImage, submitted, handleSubmit } = useContatoPage();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.sectionNumber}>11 —</span>
        <h2>Não encontrou o<br />personagem que procura?</h2>
        <p>Envie sua referência e desenvolvemos uma peça exclusiva para sua coleção.</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fields}>
          <label>
            Nome
            <input type="text" placeholder="Seu nome" value={form.nome} onChange={(e) => setField('nome', e.target.value)} />
          </label>
          <label>
            E-mail
            <input type="email" placeholder="voce@email.com" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          </label>
          <label>
            WhatsApp
            <input type="tel" placeholder="(11) 90000-0000" value={form.whatsapp} onChange={(e) => setField('whatsapp', e.target.value)} />
          </label>
          <label>
            Descreva sua ideia
            <textarea rows={3} placeholder="Personagem, referência, tamanho, cores..." value={form.ideia} onChange={(e) => setField('ideia', e.target.value)} />
          </label>
        </div>
        <div className={styles.upload}>
          <span>Referência visual</span>
          <input type="file" accept="image/*" onChange={(e) => setReferenceImage(e.target.files?.[0] ?? null)} />
          <button type="submit" className={styles.submitButton}>Solicitar avaliação</button>
          {submitted && <span className={styles.confirmation}>Recebemos sua ideia — em breve nossa equipe entra em contato.</span>}
        </div>
      </form>
    </section>
  );
}
