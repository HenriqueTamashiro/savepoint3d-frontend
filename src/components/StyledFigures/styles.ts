import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.sectionPadding};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 56px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.layout.sectionPaddingMobile};
    gap: 40px;

    & > * {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const ImageWrap = styled.div`
  flex: 1 1 320px;
  min-width: 260px;
  aspect-ratio: 3 / 4;
  background: ${({ theme }) => theme.colors.inkSoft};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    min-width: 0;
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
  flex: 1 1 420px;
  min-width: 300px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    min-width: 0;
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
