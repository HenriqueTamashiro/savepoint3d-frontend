import styled, { css } from "styled-components";

export const DioramaHero = styled.section`
  position: relative;
  width: 100%;
  min-height: min(80vh, 860px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;

  > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 680px;
  }
`;

export const DioramaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, #111 12%, rgba(17, 17, 17, 0.05) 55%);
`;

export const DioramaContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px;
  padding: 64px 56px;
  color: ${({ theme }) => theme.colors.background};

  h2 {
    margin: 16px 0 20px;
    font-size: clamp(32px, 4.6vw, 56px);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1;
    text-transform: uppercase;
    white-space: pre-wrap;
  }

  p {
    max-width: 480px;
    margin: 0 0 28px;
    color: ${({ theme }) => theme.colors.border};
    font-size: 16px;
    line-height: 1.7;
    white-space: pre-wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 48px 24px;
  }
`;

export const SectionNumber = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

export const CtaButton = styled.a`
  display: inline-block;
  padding: 16px 30px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

export const Section = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 56px 120px;

  > h2 {
    margin: 120px 0 44px;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 0.98;
    text-transform: uppercase;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 24px 80px;

    > h2 {
      margin-top: 80px;
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 48px;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 11px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.ink};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active &&
    css`
      border-color: ${theme.colors.ink};
      background: ${theme.colors.ink};
      color: ${theme.colors.background};
    `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
`;
