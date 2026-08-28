import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  padding: clamp(72px, 7vw, 120px) clamp(24px, 4vw, 56px);
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) minmax(380px, 1.1fr);
  align-items: center;
  gap: clamp(40px, 5vw, 72px);
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 620px;
  justify-self: end;

  h2 {
    margin: 16px 0 24px;
    font-size: clamp(32px, 4.6vw, 56px);
    font-weight: 900;
    letter-spacing: -0.02em;
    line-height: 1;
    text-transform: uppercase;
    white-space: pre-wrap;
  }

  p {
    max-width: 520px;
    margin: 0 0 32px;
    color: #b8b8b4;
    font-size: 16px;
    line-height: 1.7;
    white-space: pre-wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: none;
    justify-self: stretch;
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

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 48px;
`;

export const Step = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding-top: 14px;
  border-top: 1px solid #2a2a28;
`;

export const StepNumber = styled.span`
  min-width: 26px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  font-weight: 700;
`;

export const ImageWrap = styled.div`
  width: 100%;
  height: clamp(480px, 52vw, 760px);
  overflow: hidden;
  background: ${({ theme }) => theme.colors.inkSoft};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 70% 30%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: clamp(380px, 75vw, 620px);
  }
`;
