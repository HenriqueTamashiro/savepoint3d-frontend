import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.stat {
  min-width: 0;
}

.value {
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--color-accent);
  display: block;
  line-height: 1;
}

.label {
  font-size: 14px;
  color: #b8b8b4;
  margin-top: 12px;
  display: block;
}

.section {
  background: var(--color-ink);
  color: var(--color-bg);
  padding: 100px 56px;
}

.grid {
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
}

@media (max-width: 700px) {
  .section {
    padding: 72px 24px;
  }
}

`;

const styles = {
  "grid": "grid",
  "label": "label",
  "section": "section",
  "stat": "stat",
  "value": "value",
} as const;

export default styles;
