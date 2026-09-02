import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

  .card {
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    transition:
      transform 500ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 400ms ease,
      box-shadow 500ms ease;
  }

  .light {
    background: var(--color-bg);
    padding: 12px;
  }

  .dark {
    background: var(--color-ink-soft);
    color: #f2f2f0;
  }

  .hovered {
    transform: translateY(-8px) scale(1.01);
    border-color: var(--color-accent);
    box-shadow: 0 28px 56px -18px rgba(0, 0, 0, 0.32);
  }

  .glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      circle at 50% 62%,
      rgba(182, 255, 26, 0.082),
      transparent 68%
    );
    opacity: 0;
    transition: opacity 500ms ease;
  }

  .hovered .glow {
    opacity: 1;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
    cursor: pointer;
  }

  .hovered .image {
    transform: translateY(-12px) scale(1.045);
  }

  .price {
    font-size: 18px;
    font-weight: 800;
  }

  .hovered .price {
    color: var(--color-accent);
    text-shadow: 0.5px 0.8px 2px var(--color-ink);
  }

  .body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .meta {
    font-size: 11px;
    color: var(--color-muted-dark);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .name {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
  }

  .material {
    font-size: 12px;
    color: var(--color-muted-dark);
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
  }

  .addButton {
    background: var(--color-accent);
    color: var(--color-ink);
    border: none;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 10px 14px;
    cursor: pointer;
  }

  .addButton:hover {
    background: var(--color-ink);
    color: #ffffff;
  }

  .imageWrap {
    /* Mesmo padrão das imagens 1.png, 3.png, 5.png etc.: 1122 x 1402. */
    aspect-ratio: 1122 / 1402;
    position: relative;
    overflow: hidden;
    background: var(--color-ink-soft);
  }

  .productImage {
    cursor: pointer;
  }

  .tag {
    position: absolute;
    top: 16px;
    left: 16px;
    background: var(--color-accent);
    color: var(--color-ink);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 5px 10px;
  }

  .stock {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: var(--color-accent);
    color: var(--color-ink);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 5px 10px;
  }
`;

const styles = {
  addButton: "addButton",
  body: "body",
  card: "card",
  dark: "dark",
  footer: "footer",
  glow: "glow",
  hovered: "hovered",
  image: "image",
  imageWrap: "imageWrap",
  productImage: "productImage",
  light: "light",
  material: "material",
  meta: "meta",
  name: "name",
  png: "png",
  price: "price",
  stock: "stock",
  tag: "tag",
} as const;

export default styles;
