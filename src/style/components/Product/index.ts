import styled from "styled-components";

export const ProductStyle = styled.div`
  display: flex;

  .img {
    width: 70%;
    height: 20%;
  }
`;

const stylesProduct = {
  img: "img",
} as const;

export default stylesProduct;
