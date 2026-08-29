import styled from "styled-components";

export const ProductStyle = styled.div`
  display: flex;
  background: var(--color-ink-soft);

  .img {
    width: 70%;
    height: 20%;
  }
`;

const stylesProduct = {
  img: "img",
} as const;

export default stylesProduct;
