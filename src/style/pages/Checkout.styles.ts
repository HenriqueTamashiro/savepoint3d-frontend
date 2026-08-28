import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyleScope = styled.div`
  display: contents;

.checkout__page { min-height: 100vh; background: #f2f2f0; color: #111; }
.checkout__header { height: 86px; padding: 0 48px; border-bottom: 1px solid #d2d2cd; display: flex; align-items: center; justify-content: space-between; }
.checkout__header > span { color: #777771; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.checkout__brand { color: #111; font-size: 19px; font-weight: 900; letter-spacing: -.05em; }
.checkout__brand span { color: #83c900; }
.checkout__layout { min-height: calc(100vh - 86px); display: grid; grid-template-columns: minmax(0, 1fr) 410px; }
.checkout__content { padding: 60px clamp(30px, 7vw, 100px); }
.checkout__eyebrow, .checkout__summary > span { color: #75756f; font-size: 9px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.checkout__content > h1 { max-width: 820px; margin: 14px 0 48px; font-size: clamp(48px, 7vw, 92px); line-height: .86; letter-spacing: -.055em; text-transform: uppercase; }
.checkout__items { border-top: 1px solid #d2d2cd; }
.checkout__items article { display: grid; grid-template-columns: 92px 1fr auto; gap: 20px; align-items: center; padding: 20px 0; border-bottom: 1px solid #d2d2cd; }
.checkout__items img { width: 92px; height: 108px; background: #171715; object-fit: contain; }
.checkout__items article div > span { color: #777; font-size: 9px; text-transform: uppercase; }
.checkout__items h2 { margin: 5px 0; font-size: 18px; text-transform: uppercase; }
.checkout__items p { margin: 0; color: #777; font-size: 11px; }
.checkout__items strong { font-size: 14px; }
.checkout__summary { padding: 58px 38px; background: #111; color: #fff; }
.checkout__summary > h2 { margin: 10px 0 38px; font-size: 34px; line-height: .95; text-transform: uppercase; }
.checkout__summary > div { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #33332f; font-size: 12px; }
.checkout__summary .checkout__discount { color: #b6ff1a; }
.checkout__summary .checkout__total { margin-top: 13px; border: 0; font-size: 18px; }
.checkout__summary .checkout__total strong { font-size: 26px; }
.checkout__summary > p { color: #85857f; font-size: 10px; line-height: 1.5; }
.checkout__summary .checkout__error { padding: 11px; background: #421b17; color: #ffb3a9; }
.checkout__summary button { width: 100%; margin-top: 22px; padding: 17px; border: 0; background: #b6ff1a; color: #111; font-size: 10px; font-weight: 900; text-transform: uppercase; cursor: pointer; }
.checkout__summary button:disabled { opacity: .4; cursor: not-allowed; }
.checkout__summary > a { display: block; margin-top: 18px; color: #aaa; font-size: 10px; text-align: center; text-transform: uppercase; }
.checkout__empty { padding: 40px 0; border-top: 1px solid #ccc; }
.checkout__empty h2 { font-size: 26px; text-transform: uppercase; }
.checkout__empty a { display: inline-block; padding: 13px 16px; background: #111; color: #fff; font-size: 10px; text-transform: uppercase; }
@media (max-width: 850px) { .checkout__layout { grid-template-columns: 1fr; } .checkout__summary { min-height: 480px; } }
@media (max-width: 560px) { .checkout__header { padding: 0 22px; } .checkout__content { padding: 44px 22px; } .checkout__items article { grid-template-columns: 72px 1fr; } .checkout__items img { width: 72px; height: 90px; } .checkout__items article > strong { grid-column: 2; } .checkout__summary { padding: 42px 24px; } }

`;

export const Brand = styled(Link).attrs({ className: "checkout__brand" })``;
export const Content = styled.section.attrs({ className: "checkout__content" })``;
export const Discount = styled.div.attrs({ className: "checkout__discount" })``;
export const Empty = styled.div.attrs({ className: "checkout__empty" })``;
export const Error = styled.p.attrs({ className: "checkout__error" })``;
export const Eyebrow = styled.span.attrs({ className: "checkout__eyebrow" })``;
export const Header = styled.header.attrs({ className: "checkout__header" })``;
export const Items = styled.div.attrs({ className: "checkout__items" })``;
export const Layout = styled.div.attrs({ className: "checkout__layout" })``;
export const Page = styled.main.attrs({ className: "checkout__page" })``;
export const Summary = styled.aside.attrs({ className: "checkout__summary" })``;
export const Total = styled.div.attrs({ className: "checkout__total" })``;

