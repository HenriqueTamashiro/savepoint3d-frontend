import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.contato__section { padding: 120px 56px; max-width: 1200px; margin: 0 auto; }
.contato__header { margin-bottom: 48px; }
.contato__sectionNumber { font-size: 13px; color: var(--color-muted); font-weight: 600; letter-spacing: 0.04em; }
.contato__header h2 { margin: 8px 0 0; font-size: clamp(30px, 4.4vw, 54px); font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; line-height: 1; }
.contato__header p { margin: 20px 0 0; font-size: 16px; color: var(--color-muted); max-width: 520px; }
.contato__form { display: flex; flex-wrap: wrap; gap: 44px; }
.contato__fields { flex: 1 1 380px; min-width: 280px; display: flex; flex-direction: column; gap: 22px; }
.contato__fields label { display: flex; flex-direction: column; gap: 8px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-muted); }
.contato__fields input, .contato__fields textarea { border: none; border-bottom: 1px solid var(--color-border); padding: 12px 4px; font-size: 16px; font-family: inherit; background: transparent; color: var(--color-ink); }
.contato__upload { flex: 1 1 280px; min-width: 240px; display: flex; flex-direction: column; gap: 16px; }
.contato__submitButton { margin-top: 8px; background: var(--color-ink); color: #F2F2F0; border: none; font-size: 13px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; padding: 16px 30px; cursor: pointer; }
.contato__submitButton:hover { background: var(--color-accent); color: var(--color-ink); }
.contato__confirmation { font-size: 13px; color: #5c8c00; }

@media (max-width: 700px) {
  .contato__section { padding: 80px 24px; }
  .contato__fields, .contato__upload { width: 100%; min-width: 0; }
}

`;

export const Confirmation = styled.span.attrs({ className: "contato__confirmation" })``;
export const Fields = styled.div.attrs({ className: "contato__fields" })``;
export const Form = styled.form.attrs({ className: "contato__form" })``;
export const Header = styled.div.attrs({ className: "contato__header" })``;
export const Section = styled.section.attrs({ className: "contato__section" })``;
export const SectionNumber = styled.span.attrs({ className: "contato__sectionNumber" })``;
export const SubmitButton = styled.button.attrs({ className: "contato__submitButton" })``;
export const Upload = styled.div.attrs({ className: "contato__upload" })``;

