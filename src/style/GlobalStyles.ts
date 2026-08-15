import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-bg: ${({ theme }) => theme.colors.background};
    --color-ink: ${({ theme }) => theme.colors.ink};
    --color-ink-soft: ${({ theme }) => theme.colors.inkSoft};
    --color-accent: ${({ theme }) => theme.colors.accent};
    --color-muted: ${({ theme }) => theme.colors.muted};
    --color-muted-dark: ${({ theme }) => theme.colors.mutedDark};
    --color-border: ${({ theme }) => theme.colors.border};
    --color-ink-transparent: ${({ theme }) => theme.colors.inkTransparent};
    --font-sans: ${({ theme }) => theme.fonts.sans};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  button, input, textarea {
    font: inherit;
  }

  img, video {
    max-width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.ink};
    text-decoration: none;
  }

  a:hover {
    color: #5c8c00;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.ink};
  }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      transition: none !important;
      animation: none !important;
    }
  }
`;
