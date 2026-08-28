import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

  .carousel {
    display: flex;
    gap: 1px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 0 max(56px, calc((100vw - 1600px) / 2 + 56px));
    background: #2a2a28;
    scrollbar-width: thin;
    scrollbar-color: var(--color-accent) #2a2a28;
  }

  @media (max-width: 700px) {
    .carousel {
      padding: 0 24px;
    }
  }

  .header {
    max-width: 1600px;
    margin: 0 auto 56px;
    padding: 0 56px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 20px;
  }

  .sectionNumber {
    font-size: 13px;
    color: var(--color-accent);
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .header h2 {
    margin: 8px 0 0;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    line-height: 0.98;
  }

  .controls {
    display: flex;
    gap: 12px;
  }

  .controls button {
    width: 44px;
    height: 44px;
    border: 1px solid #3a3a38;
    background: none;
    color: var(--color-bg);
    cursor: pointer;
    font-size: 18px;
    transition:
      border-color 0.25s,
      color 0.25s;
  }

  .controls button:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  @media (max-width: 700px) {
    .header {
      padding: 0 24px;
    }
  }

  .section {
    background: var(--color-ink);
    color: var(--color-bg);
    padding: 120px 0;
    overflow: hidden;
  }

  @media (max-width: 700px) {
    .section {
      padding: 80px 0;
    }
  }

  .card {
    background: var(--color-ink-soft);
    min-width: 320px;
    flex: 0 0 320px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .imageWrap {
    width: 100%;
    aspect-ratio: 1122 / 1402;
    position: relative;
    overflow: hidden;
    background: #181816;
  }

  .imageWrap img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .card:hover .imageWrap img {
    transform: scale(1.04);
  }

  .card h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
    color: var(--color-muted-dark);
  }

  .availability {
    color: var(--color-accent);
  }

  .price {
    font-size: 19px;
    font-weight: 800;
    color: var(--color-bg);
    margin-top: auto;
  }

  @media (max-width: 700px) {
    .card {
      min-width: 280px;
      flex-basis: 280px;
    }
  }
`;

const styles = {
  availability: "availability",
  card: "card",
  carousel: "carousel",
  controls: "controls",
  header: "header",
  imageWrap: "imageWrap",
  meta: "meta",
  price: "price",
  section: "section",
  sectionNumber: "sectionNumber",
} as const;

export default styles;
