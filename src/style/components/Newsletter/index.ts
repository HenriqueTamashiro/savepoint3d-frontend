import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.section {
  background: var(--color-ink);
  color: #f2f2f0;
  padding: 110px 56px;
  text-align: center;
}

.inner {
  max-width: 640px;
  margin: 0 auto;
}

.inner h2 {
  margin: 0 0 16px;
  font-size: clamp(32px, 5vw, 58px);
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1;
}

.inner p {
  font-size: 15px;
  color: #b8b8b4;
  margin: 0 0 36px;
}

.confirmation {
  display: block;
  margin-top: 16px;
  font-size: 13px;
  color: var(--color-accent);
}

.form {
  display: flex;
  max-width: 440px;
  margin: 0 auto;
  border-bottom: 1px solid #3a3a38;
}

.form input {
  flex: 1;
  background: none;
  border: none;
  color: #f2f2f0;
  font-size: 16px;
  padding: 14px 4px;
}

.form button {
  background: none;
  border: none;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 14px 4px;
  cursor: pointer;
  white-space: nowrap;
}

`;

const styles = {
  "confirmation": "confirmation",
  "form": "form",
  "inner": "inner",
  "section": "section",
} as const;

export default styles;
