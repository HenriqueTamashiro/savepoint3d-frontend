import { useContatoPage } from './handler';
import * as S from "../../style/pages/Contato.styles";

export default function Contato() {
  const { form, setField, setReferenceImage, submitted, handleSubmit } = useContatoPage();

  return (<S.StyleScope>{(
    <S.Section>
      <S.Header>
        <S.SectionNumber>11 —</S.SectionNumber>
        <h2>Não encontrou o<br />personagem que procura?</h2>
        <p>Envie sua referência e desenvolvemos uma peça exclusiva para sua coleção.</p>
      </S.Header>
      <S.Form onSubmit={handleSubmit}>
        <S.Fields>
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
        </S.Fields>
        <S.Upload>
          <span>Referência visual</span>
          <input type="file" accept="image/*" onChange={(e) => setReferenceImage(e.target.files?.[0] ?? null)} />
          <S.SubmitButton type="submit">Solicitar avaliação</S.SubmitButton>
          {submitted && <S.Confirmation>Recebemos sua ideia — em breve nossa equipe entra em contato.</S.Confirmation>}
        </S.Upload>
      </S.Form>
    </S.Section>
  )}</S.StyleScope>);
}
