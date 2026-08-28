import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.card {
  border-top: 1px solid var(--color-ink);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.stars {
  font-size: 14px;
  letter-spacing: 0.1em;
  color: var(--color-accent);
}

.comment {
  font-size: 17px;
  line-height: 1.6;
  margin: 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 8px;
}

.name {
  font-size: 14px;
  font-weight: 800;
  display: block;
}

.product {
  font-size: 12px;
  color: var(--color-muted);
}

.date {
  font-size: 12px;
  color: var(--color-muted);
}

.section {
  padding: 120px 56px;
  max-width: 1600px;
  margin: 0 auto;
}

.section h2 {
  margin: 0 0 56px;
  font-size: clamp(32px, 4.6vw, 54px);
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 48px;
}

`;

const styles = {
  "card": "card",
  "comment": "comment",
  "date": "date",
  "footer": "footer",
  "grid": "grid",
  "name": "name",
  "product": "product",
  "section": "section",
  "stars": "stars",
} as const;

export default styles;
