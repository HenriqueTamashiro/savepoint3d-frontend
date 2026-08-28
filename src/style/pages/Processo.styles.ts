import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.sectionPadding};
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) minmax(380px, 1.1fr);
  align-items: center;
  gap: clamp(40px, 5vw, 72px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.layout.sectionPaddingMobile};
  }
`;

export const Content = styled.div`
  width: 100%;

  h2 {
    margin: 16px 0 32px;
    font-size: clamp(30px, 4.2vw, 52px);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1;
    text-transform: uppercase;
    white-space: pre-wrap;
  }
`;

export const SectionNumber = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

export const Steps = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StepNumber = styled.span`
  min-width: 24px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  font-weight: 700;
`;

export const ImageWrap = styled.div`
  width: 100%;
  height: clamp(360px, 42vw, 620px);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.inkSoft};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 65% 30%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: clamp(320px, 68vw, 520px);
  }
`;
