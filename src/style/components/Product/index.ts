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

      border-left: 1px solid var(--color-accent);
      border-right: 1px solid var(--color-accent);
    }
  }

  .gallery {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 15px;
    padding: 5px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;

      border: 0.1px solid var(--color-accent);
    }
  }

  .product {
    background: var(--color-ink);
  }

  .infoSector {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    align-content: start;

    padding: 95px;

    width: 100%;
    height: 100%;

    .titleArea {
      display: grid;
      grid-template-columns: 1fr;
      border-bottom: 1px solid var(--color-accent);
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
        color: var(--color-muted-dark);
        text-decoration: 1px line-through;
      }

      .payment {
        .installmments {
          color: var(--color-accent);
        }
      }
    }

    .textArea {
      padding-top: 15px;
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 900px) {
    .article {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
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

  titleArea: "titleArea",
  textArea: "textArea",
  priceArea: "priceArea",
  buttonArea: "buttonArea",
  nameArea: "nameArea",
  informative: "informative",

  material: "material",
  meta: "meta",
  name: "name",
  png: "png",
  price: "price",
  stock: "stock",
  tag: "tag",
  addButton: "addButton",
  offer: "offer",
  payment: "payment",
  installmments: "installmments",
} as const;

export default stylesProduct;
