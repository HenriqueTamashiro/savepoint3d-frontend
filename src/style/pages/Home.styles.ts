import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

  .home__hero {
    background: var(--color-ink);
    min-height: 92vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: stretch;
  }
  .home__heroVideo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 65% center;
    position: absolute;
    inset: 0;
  }
  .home__heroOverlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(17, 17, 17, 0.92) 0%,
      rgba(17, 17, 17, 0.55) 42%,
      rgba(17, 17, 17, 0.15) 75%
    );
  }
  .home__heroContent {
    flex: 1 1 560px;
    min-width: 320px;
    max-width: 760px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 140px 56px 80px;
    gap: 28px;
    color: #f2f2f0;
    position: relative;
    z-index: 2;
  }
  .home__heroKicker {
    font-size: 12px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-accent);
    font-weight: 700;
  }
  .home__heroContent h1 {
    margin: 0;
    font-size: clamp(48px, 7vw, 104px);
    font-weight: 900;
    line-height: 0.94;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    white-space: pre-wrap;
  }
  .home__heroContent p {
    margin: 0;
    max-width: 460px;
    font-size: 18px;
    line-height: 1.6;
    color: #b8b8b4;
    white-space: pre-wrap;
  }
  .home__heroActions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .home__primaryButton {
    background: var(--color-accent);
    color: var(--color-ink);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 16px 30px;
    display: inline-block;
  }
  .home__primaryButton:hover {
    background: #f2f2f0;
  }
  .home__secondaryButton {
    background: none;
    color: #f2f2f0;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    padding: 16px 30px;
    border: 1px solid #4a4a48;
    display: inline-block;
  }
  .home__secondaryButton:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .home__destaques {
    padding: 120px 56px;
    max-width: 1600px;
    margin: 0 auto;
  }
  .home__sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 64px;
  }
  .home__sectionNumber {
    font-size: 13px;
    color: var(--color-muted);
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .home__sectionHeader h2 {
    margin: 8px 0 0;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    line-height: 0.98;
  }
  .home__sectionHeader p {
    max-width: 340px;
    font-size: 15px;
    color: var(--color-muted);
    line-height: 1.6;
    margin: 0;
  }
  .home__destaquesCarousel {
    position: relative;
  }

  .home__destaquesGrid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% - 6px) / 3);
    gap: 2px;
    background: var(--color-border);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .home__destaquesGrid::-webkit-scrollbar {
    display: none;
  }

  .home__destaquesGrid > * {
    min-width: 0;
    scroll-snap-align: start;
  }

  .home__carouselControl {
    position: absolute;
    z-index: 3;
    top: 35%;
    bottom: auto;
    width: clamp(44px, 5vw, 72px);
    height: 25%;
    transform: translateY(-50%);
    border: 0;
    color: var(--color-accent);
    font-size: 46px;
    line-height: 1;
    cursor: pointer;
    opacity: 0;
    transition: opacity 180ms ease;
  }

  .home__carouselControlPrevious {
    left: 0;
    /* remova top: -25% */
  }

  .home__carouselControlNext {
    right: 0;
    /* remova top: -25% */
  }

  .home__destaquesCarousel:hover .home__carouselControl:not(:disabled),
  .home__carouselControl:focus-visible {
    opacity: 1;
  }

  .home__carouselControlPrevious {
    left: 0;
    background: linear-gradient(
      90deg,
      var(--color-ink-transparent),
      transparent
    );
  }

  .home__carouselControlNext {
    right: 0;
    background: linear-gradient(
      270deg,
      var(--color-ink-transparent),
      transparent
    );
  }

  .home__carouselControl:disabled {
    pointer-events: none;
    opacity: 0;
  }

  .home__categorias {
    padding: 0 56px 120px;
    max-width: 1600px;
    margin: 0 auto;
  }
  .home__categorias h2 {
    margin: 0 0 56px;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    line-height: 0.98;
  }
  .home__categoriasGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1px;
    background: var(--color-border);
    border: 1px solid var(--color-border);
  }

  @media (max-width: 1200px) {
    .home__destaquesGrid {
      grid-auto-columns: calc((100% - 4px) / 3);
    }
  }

  @media (max-width: 800px) {
    .home__destaques,
    .home__categorias {
      padding-right: 24px;
      padding-left: 24px;
    }

    .home__destaquesGrid {
      grid-auto-columns: calc((100% - 2px) / 2);
    }

    .home__carouselControl:not(:disabled) {
      opacity: 1;
    }
  }

  @media (max-width: 520px) {
    .home__heroContent {
      width: 100%;
      min-width: 0;
      padding: 96px 26px 60px;
      gap: 24px;
    }

    .home__heroContent h1 {
      font-size: clamp(44px, 14vw, 62px);
      overflow-wrap: anywhere;
    }

    .home__heroContent p {
      font-size: 17px;
    }

    .home__heroActions,
    .home__heroActions a {
      width: 100%;
    }

    .home__heroActions a {
      text-align: center;
    }

    .home__destaquesGrid {
      grid-auto-columns: 100%;
    }
  }
`;

export const Categorias = styled.section.attrs({
  className: "home__categorias",
})``;
export const CarouselItem = styled.div`
  min-width: 0;
  height: 100%;
  scroll-snap-align: start;
`;

export const CarouselControl = styled.button.attrs<{
  $direction: "previous" | "next";
}>(({ $direction }) => ({
  className: `home__carouselControl ${$direction === "previous" ? "home__carouselControlPrevious" : "home__carouselControlNext"}`,
}))``;
export const CategoriasGrid = styled.div.attrs({
  className: "home__categoriasGrid",
})``;
export const Destaques = styled.section.attrs({
  className: "home__destaques",
})``;
export const DestaquesCarousel = styled.div.attrs({
  className: "home__destaquesCarousel",
})``;
export const DestaquesGrid = styled.div.attrs({
  className: "home__destaquesGrid",
})``;
export const Hero = styled.section.attrs({ className: "home__hero" })``;
export const HeroActions = styled.div.attrs({
  className: "home__heroActions",
})``;
export const HeroContent = styled.div.attrs({
  className: "home__heroContent",
})``;
export const HeroKicker = styled.span.attrs({
  className: "home__heroKicker",
})``;
export const HeroOverlay = styled.div.attrs({
  className: "home__heroOverlay",
})``;
export const HeroVideo = styled.video.attrs({ className: "home__heroVideo" })``;
export const PrimaryButton = styled.a.attrs({
  className: "home__primaryButton",
})``;
export const SecondaryButton = styled.a.attrs({
  className: "home__secondaryButton",
})``;
export const SectionHeader = styled.div.attrs({
  className: "home__sectionHeader",
})``;
export const SectionNumber = styled.span.attrs({
  className: "home__sectionNumber",
})``;
