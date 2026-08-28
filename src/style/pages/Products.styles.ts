import styled from "styled-components";

export const Page = styled.section`
  min-height: 60vh;
  padding: ${({ theme }) => theme.layout.sectionPadding};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.layout.sectionPaddingMobile};
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;

  h2 {
    margin: 0;
    font-size: clamp(36px, 6vw, 76px);
    line-height: 0.95;
    text-transform: uppercase;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 5px;
  align-items: stretch;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: 1050px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
