import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.sectionPadding};
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(320px, 0.85fr);
  align-items: center;
  gap: clamp(40px, 5vw, 72px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.layout.sectionPaddingMobile};
    gap: 40px;
  }
`;

export const ImageWrap = styled.div`
  width: 100%;
  height: clamp(480px, 52vw, 760px);
  background: ${({ theme }) => theme.colors.inkSoft};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: clamp(420px, 80vw, 680px);
  }
`;

export const FigureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  transition: transform ${({ theme }) => theme.transitions.image};

  ${ImageWrap}:hover & {
    transform: scale(1.035);
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 560px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: none;
  }
`;

export const SectionNumber = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

export const Title = styled.h2`
  margin: 16px 0 24px;
  font-size: clamp(30px, 4.2vw, 52px);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  text-transform: uppercase;
  white-space: pre-wrap;
`;

export const Description = styled.p`
  max-width: 460px;
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 16px;
  line-height: 1.7;
  white-space: pre-wrap;
`;

export const CtaButton = styled.a`
  display: inline-block;
  padding: 16px 30px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.ink};
  }
`;
