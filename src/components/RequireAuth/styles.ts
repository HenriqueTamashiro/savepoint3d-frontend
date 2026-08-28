import styled from "styled-components";

export const ValidationScreen = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.accent};
`;
