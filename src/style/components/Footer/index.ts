import styled from "styled-components";

export const DeveloperCredit = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8a8a86;
  font-size: 12px;
  white-space: nowrap;
`;

export const DeveloperLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #b8b8b4;
  font-weight: 700;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const DeveloperIcon = styled.img`
  width: 45px;
  height: 45px;
  flex: 0 0 28px;
  object-fit: contain;
`;

export const StyleScope = styled.div`
  display: contents;

  .bottomBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    border-top: 1px solid #2a2a28;
    margin-top: 48px;
    padding-top: 24px;
  }

  .paymentMethods {
    display: flex;
    gap: 10px;
  }

  .paymentBadge {
    border: 1px solid #3a3a38;
    padding: 5px 10px;
    font-size: 11px;
    color: #8a8a86;
  }

  .footer {
    background: var(--color-ink-soft);
    color: #b8b8b4;
    padding: 80px 56px 32px;
  }

  .inner {
    max-width: 1600px;
    margin: 0 auto;
  }

  .logo {
    height: 96px;
    max-height: 96px;
    width: auto;
    object-fit: contain;
    margin-bottom: 40px;
  }

  .headline {
    margin: 0 0 64px;
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 900;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #f2f2f0;
    line-height: 1.1;
  }

  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 32px;
    border-top: 1px solid #2a2a28;
    padding-top: 48px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .column a {
    color: #b8b8b4;
    font-size: 13px;
  }

  .column a:hover {
    color: var(--color-accent);
  }

  .columnTitle {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #f2f2f0;
  }
`;

const styles = {
  bottomBar: "bottomBar",
  column: "column",
  columnTitle: "columnTitle",
  columns: "columns",
  footer: "footer",
  headline: "headline",
  inner: "inner",
  logo: "logo",
  paymentBadge: "paymentBadge",
  paymentMethods: "paymentMethods",
} as const;

export default styles;
