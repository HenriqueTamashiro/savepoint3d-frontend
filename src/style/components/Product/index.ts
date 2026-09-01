import styled from "styled-components";

export const ProductStyle = styled.div`
  --width-gallery: 100px;
  --title-size: 5rem;

  background: var(--color-ink-soft);
  color: white;

  .wrapper {
    display: flex;
    justify-content: center;

    width: 100%;
    max-height: 850px;
  }

  .container {
  }

  .article {
    display: grid;
    background: var(--color-ink-soft);
    width: min(100%, 1580px);

    grid-template-columns:
      calc(var(--width-gallery) + 5px)
      minmax(300px, 520px)
      minmax(280px, 1fr);
    grid-template-rows: auto;
  }

  .productImage {
    width: 100%;
    padding: 0 5px 0 5px;

    img {
      object-fit: cover;

      border-left: 1px solid var(--color-darkAccent);
      border-right: 1px solid var(--color-darkAccent);
    }
  }

  .gallery {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 15px;
    padding: 5px;
    background: var(--color-muted-black);

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;

      border: 0.1px solid var(--color-darkAccent);
    }
  }

  .product {
    background: var(--color-ink);
  }

  .infoSector {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 1fr auto;
    align-content: start;

    padding: 65px;

    width: 100%;
    height: 100%;

    .titleArea {
      display: grid;
      grid-template-columns: 1fr;
      border-bottom: 1px solid var(--color-darkAccent);
      padding-bottom: 5px;

      .name {
        font-family: "Inter", Helvetica, Arial, sans-serif;
        font-size: var(--title-size);
        font-weight: 500;
        text-transform: uppercase;
        line-height: 1;
      }

      .informative {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;

        .material {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: var(--color-muted-dark);
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
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 5px 10px;
          height: 30px;
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

      .price {
        color: white;
        font-size: clamp(2rem, 4vw, 3.5rem);
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
        font-size: 16px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 1px 1px;
        height: 30px;
      }
    }

    .textArea {
      padding-top: 15px;
      width: 100%;
      height: 100%;
    }

    .buttonArea {
      display: grid;
      grid-template-columns: 122px minmax(0, 1fr);
      grid-template-rows: 58px 58px;
      gap: 10px;
      width: 100%;

      button {
        cursor: pointer;
      }

      .buyButton {
        font-size: 32px;
        grid-column: 1 / -1;
        background: var(--color-accent);
        border: none;
      }
      .buyButton:hover {
        background: var(--color-clearAccent);
        color: #000000;
        transition: 200ms;
      }

      .addButton {
        background: var(--color-ink);
        color: #ffffff;
        border: 0.1px solid var(--color-darkAccent);
      }
      .addButton:hover {
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
        button:hover {
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

  @media (max-width: 900px) {
    .article {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
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
