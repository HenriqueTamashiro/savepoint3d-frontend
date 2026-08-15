export const theme = {
  colors: {
    background: "#f2f2f0",
    ink: "#111111",
    inkSoft: "#1a1a1a",
    accent: "#a7e918",
    muted: "#686868",
    mutedDark: "#8a8a86",
    border: "#d8d8d5",
    inkTransparent: "#5555550c",
  },
  fonts: {
    sans: '"Inter", Helvetica, Arial, sans-serif',
  },
  layout: {
    maxWidth: "1600px",
    sectionPadding: "120px 56px",
    sectionPaddingMobile: "80px 24px",
  },
  breakpoints: {
    mobile: "700px",
    tablet: "900px",
  },
  transitions: {
    fast: "250ms ease",
    image: "700ms cubic-bezier(0.22, 1, 0.36, 1)",
  },
} as const;

export type AppTheme = typeof theme;
