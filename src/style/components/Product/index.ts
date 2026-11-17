import styled from "styled-components";

export const ProductStyle = styled.div`
  --width-gallery: 100px;
  --title-size: clamp(2rem, 3vw, 3.25rem);

  background: var(--color-ink-soft);
  color: white;

  .wrapper {
    display: flex;
    justify-content: center;

    width: 100%;
    padding-inline: clamp(0px, 1vw, 16px);
  }

  .container {
  }

  .article {
    display: grid;
    background: var(--color-ink-soft);
    width: min(100%, 1580px);
    min-width: 0;
    min-height: 680px;

    grid-template-columns:
      calc(var(--width-gallery) + 5px)
      minmax(300px, 520px)
      minmax(280px, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
    overflow: hidden;
  }

  .productImage {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    max-height: 100%;
    aspect-ratio: 5 / 8;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--color-muted-black);

    img {
      display: block;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      object-position: center;

      border-left: 1px solid var(--color-darkAccent);
      border-right: 1px solid var(--color-darkAccent);
    }
  }

  .gallery {
    position: relative;
    box-sizing: border-box;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: var(--color-muted-black);
    padding: 44px 5px;
  }

  .thumbnailList {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: repeat(4, minmax(0, 1fr));
    gap: 15px;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    background: var(--color-muted-black);

    img {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;

      border: 0.1px solid var(--color-darkAccent);
    }
  }

  .thumbnail {
    padding: 0;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    border: 2px solid transparent;
    background: var(--color-ink);
    cursor: pointer;
    opacity: 0.6;
    transition:
      opacity 180ms ease,
      border-color 180ms ease;
  }

  .thumbnail:hover,
  .thumbnail[aria-pressed="true"] {
    opacity: 1;
    border-color: var(--color-accent);
  }

  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -4px;
  }

  .galleryControl {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: clamp(44px, 5vw, 72px);
    height: 25%;
    border: 0;
    color: var(--color-accent);
    font-size: 46px;
    line-height: 1;
    cursor: pointer;
    opacity: 0;
    transition: opacity 180ms ease;
  }

  .galleryPrevious {
    left: 0;
    background: linear-gradient(
      90deg,
      var(--color-ink-transparent),
      transparent
    );
  }

  .galleryNext {
    right: 0;
    background: linear-gradient(
      270deg,
      var(--color-ink-transparent),
      transparent
    );
  }

  .productImage:hover .galleryControl:not(:disabled),
  .productImage:focus-within .galleryControl:not(:disabled),
  .gallery:hover .galleryControl:not(:disabled),
  .gallery:focus-within .galleryControl:not(:disabled) {
    opacity: 1;
  }

  .gallery .galleryControl {
    left: 0;
    top: auto;
    transform: none;
    width: 100%;
    height: 44px;
    z-index: 1;

    span {
      display: inline-block;
      transform: rotate(90deg);
    }
  }

  .gallery .thumbnailPrevious {
    top: 0;
    background: linear-gradient(180deg, var(--color-ink-transparent), transparent);
  }

  .thumbnailNext {
    bottom: 0;
    background: linear-gradient(0deg, var(--color-ink-transparent), transparent);
  }

  .galleryControl:disabled {
    opacity: 0;
    pointer-events: none;
  }

  .imageCounter {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 12px;
    background: var(--color-ink);
    color: white;
    border-radius: 20px;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }

  @media (hover: none) {
    .galleryControl:not(:disabled) {
      opacity: 1;
    }
  }

  .product {
    background: var(--color-ink);
  }

  .infoSector {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(150px, 1fr) auto auto;
    gap: 18px;
    align-content: start;

    padding: clamp(20px, 2.5vw, 40px);

    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;

    .titleArea {
      display: grid;
      grid-template-columns: 1fr;
      border-bottom: 1px solid var(--color-accent);
      padding-bottom: 8px;
      gap: 8px;

      .ratingLine {
        margin: 0;
        color: var(--color-accent);
        font-size: 14px;
        line-height: 1.5;

        span {
          color: #b7b7b7;
          font-size: 12px;
        }
      }

      .name {
        font-family: "Inter", Helvetica, Arial, sans-serif;
        font-size: var(--title-size);
        font-weight: 700;
        margin: 0;
        overflow-wrap: anywhere;
        letter-spacing: -0.025em;
        text-transform: uppercase;
        line-height: 1.1;
      }

      .informative {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 16px;

        .material {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          line-height: 1.5;
          color: #b7b7b7;
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
          display: flex;
          align-self: center;
          background: var(--color-accent);
          color: var(--color-ink);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 5px 10px;
          min-height: 30px;
        }
      }
    }

    .nameArea {
      text {
        color: var(--color-accent);
      }
    }

    .priceArea {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      gap: 6px;

      .price {
        color: white;
        font-size: clamp(2rem, 3vw, 2.75rem);
        line-height: 1;
        font-weight: 700;
      }

      .offer {
        font-size: 16px;
        padding: 0 0 0 5px;
        color: var(--color-muted-dark);
        text-decoration: 1px line-through;
      }

      .payment {
        padding: 5px 0 0 0;
        font-size: 14px;
        .installmments {
          color: var(--color-accent);
        }
      }

      .tagOffer {
        background: var(--color-accent);
        color: var(--color-ink);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 3px 6px;
        line-height: 1.2;
      }
    }

    .textArea {
      width: 100%;

      .informative {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 16px;
        margin-top: 16px;
        font-size: 12px;
        line-height: 1.5;
        color: #b7b7b7;
      }

      h2 {
        margin: 0 0 8px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #b7b7b7;
      }

      p {
        margin: 0;
        font-size: 15px;
        line-height: 1.65;
        color: #dedede;
      }
    }

    .buttonArea {
      display: grid;
      grid-template-columns: 122px minmax(0, 1fr);
      grid-template-rows: 58px 58px;
      gap: 10px;
      width: 100%;

      button {
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
      }

      button:disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }

      .buyButton {
        font-size: 16px;
        font-weight: 700;
        grid-column: 1 / -1;
        background: var(--color-accent);
        border: none;
      }
      .buyButton:hover:not(:disabled) {
        background: var(--color-accent);
        color: #fff;
        transition: 200ms;
      }

      .addButton {
        background: var(--color-ink);
        color: #ffffff;
        border: 0.1px solid var(--color-darkAccent);
      }
      .addButton:hover:not(:disabled) {
        background: var(--color-inkClearSoft);
        color: #ffffff;
        transition: 200ms;
      }

      .quantityButton {
        display: grid;
        grid-template-columns: 40px auto 40px;
        border: 0.1px solid var(--color-darkAccent);
        background: var(--color-ink);

        button {
          background: var(--color-muted-black);
          color: #ffffff;
          border: none;
          font-size: 28px;
          transition: 200ms;
        }
        button:hover:not(:disabled) {
          background: var(--color-accent);
          color: #000;
          transition: 200ms;
        }

        output {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    --width-gallery: 90px;
    --title-size: clamp(2rem, 4vw, 3rem);

    .wrapper {
      padding-inline: 0;
    }

    .article {
      grid-template-columns: var(--width-gallery) minmax(0, 1fr);
      grid-template-rows: minmax(520px, 72vh) auto;
      height: auto;
      min-height: 0;
      max-height: none;
      overflow: hidden;
    }

    .gallery,
    .productImage {
      grid-row: 1;
    }

    .gallery {
      grid-column: 1;
      gap: 10px;
    }

    .productImage {
      grid-column: 2;
      height: 100%;
      aspect-ratio: auto;
    }

    .infoSector {
      grid-column: 1 / -1;
      grid-row: 2;
      grid-template-rows: auto minmax(150px, 1fr) auto auto;
      gap: 18px;
      height: auto;
      padding: clamp(36px, 6vw, 72px);

      .textArea {
        height: auto;
        padding-top: 0;
      }
    }
  }

  @media (max-width: 700px) {
    --title-size: clamp(1.75rem, 7vw, 2.5rem);

    .article {
      grid-template-columns: 64px minmax(0, 1fr);
      grid-template-rows: auto auto;
    }

    .gallery {
      grid-column: 1;
      grid-row: 1;
      padding: 44px 4px;
    }

    .thumbnailList {
      gap: 8px;
    }

    .productImage {
      grid-column: 2;
      grid-row: 1;
      width: 100%;
      height: auto;
      padding: 0;
      aspect-ratio: 1122 / 1402;

      img {
        border: 0;
      }
    }

    .infoSector {
      grid-column: 1 / -1;
      grid-row: 2;
      gap: 18px;
      padding: 36px 24px 44px;

      .titleArea {
        .informative {
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;

          .material {
            justify-content: flex-start;
            font-size: 14px;
          }

          .stock {
            flex: none;
            font-size: 12px;
          }
        }
      }

      .priceArea {
        .price {
          font-size: clamp(2rem, 8vw, 2.75rem);
        }
      }

      .buttonArea {
        grid-template-columns: 122px minmax(0, 1fr);
      }
    }
  }

  @media (max-width: 420px) {
    .infoSector {
      padding-inline: 18px;

      .buttonArea {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: repeat(3, 56px);

        .quantityButton {
          grid-template-columns: 1fr 48px 1fr;
        }

        .buyButton {
          grid-column: 1;
        }
      }
    }
  }
`;

const stylesProduct = {
  img: "img",
  container: "container",
  product: "product",
  productImage: "productImage",
  gallery: "gallery",
  wrapper: "wrapper",
  article: "article",

  infoSector: "infoSector",
  informative: "informative",

  titleArea: "titleArea",
  textArea: "textArea",
  priceArea: "priceArea",
  buttonArea: "buttonArea",
  nameArea: "nameArea",

  material: "material",
  meta: "meta",
  name: "name",
  png: "png",
  price: "price",
  stock: "stock",
  tag: "tag",
  addButton: "addButton",
  offer: "offer",
  tagOffer: "tagOffer",
  payment: "payment",
  installmments: "installmments",
  buyButton: "buyButton",
  quantityButton: "quantityButton",
} as const;

export default stylesProduct;
