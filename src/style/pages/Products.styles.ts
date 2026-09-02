import styled from "styled-components";

export const Page = styled.section`
  min-height: 60vh;
  padding: clamp(72px, 8vw, 120px) clamp(16px, 4vw, 56px);
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
  gap: clamp(5px, 0.8vw, 12px);
  align-items: stretch;

  > div {
    min-width: 0;
    height: 100%;
  }

  .card {
    height: 100%;
    min-width: 0;
  }

  .body {
    flex: 1;
  }

  .footer {
    gap: 12px;
  }

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    .body {
      padding: 16px;
    }

    .footer {
      align-items: stretch;
      flex-direction: column;
    }

    .addButton {
      width: 100%;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin-inline: auto;

    .footer {
      align-items: center;
      flex-direction: row;
    }

    .addButton {
      width: auto;
    }
  }
`;
