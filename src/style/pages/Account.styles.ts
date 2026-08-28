import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyleScope = styled.div`
  display: contents;

.account__accountPage { min-height: 100vh; display: grid; grid-template-columns: 285px 1fr; background: #f2f2f0; color: #111; transition: grid-template-columns .25s ease; }
.account__accountPage.account__menuCollapsed { grid-template-columns: 68px 1fr; }
.account__sidebar { min-height: 100vh; padding: 28px 22px; background: #111; color: #fff; display: flex; flex-direction: column; overflow: hidden; transition: padding .25s ease; }
.account__sidebarHeader { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.account__brand { color: #fff; font-size: 19px; font-weight: 900; letter-spacing: -.05em; }
.account__brand span { color: #b6ff1a; }
.account__collapseButton { width: 38px; height: 38px; flex: none; border: 1px solid #b6ff1a; background: #111; color: #b6ff1a; font-size: 20px; cursor: pointer; }
.account__collapseButton:hover { border-color: #b6ff1a; color: #b6ff1a; }
.account__profile { margin: 62px 10px 30px; }
.account__avatar { width: 52px; height: 52px; display: grid; place-items: center; margin-bottom: 18px; border-radius: 50%; background: #b6ff1a; color: #111; font-size: 19px; font-weight: 900; }
.account__profile > span { color: #7d7d77; font-size: 9px; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.account__profile h1 { margin: 6px 0 5px; overflow: hidden; font-size: 24px; text-overflow: ellipsis; text-transform: uppercase; }
.account__profile p { margin: 0; color: #777771; font-size: 11px; line-height: 1.4; }
.account__navigation { display: grid; gap: 4px; }
.account__navigation button { display: grid; grid-template-columns: 18px 20px 1fr; align-items: center; gap: 10px; width: 100%; padding: 14px 12px; border: 1px solid transparent; background: transparent; color: #92928c; font-size: 12px; font-weight: 700; text-align: left; cursor: pointer; }
.account__tabIcon { width: 17px; height: 17px; color: #74746e; transition: color .2s ease; }
.account__navigation button span { color: #555550; font-size: 9px; }
.account__navigation button b { overflow: hidden; font-size: inherit; white-space: nowrap; }
.account__navigation button:hover, .account__navigation .account__activeTab { border-color: #33332f; background: #1c1c1a; color: #fff; }
.account__navigation button:hover .account__tabIcon, .account__navigation .account__activeTab .account__tabIcon { color: #b6ff1a; }
.account__navigation .account__activeTab span { color: #b6ff1a; }
.account__sidebarFooter { margin-top: auto; padding: 18px 10px 0; border-top: 1px solid #30302d; display: grid; gap: 12px; }
.account__sidebarFooter a, .account__sidebarFooter button { padding: 0; border: 0; background: none; color: #777771; font-size: 10px; text-align: left; text-transform: uppercase; cursor: pointer; }
.account__sidebarFooter a:hover, .account__sidebarFooter button:hover { color: #b6ff1a; }
.account__menuCollapsed .account__sidebar { padding-inline: 15px; }
.account__menuCollapsed .account__sidebarHeader { justify-content: center; }
.account__menuCollapsed .account__brand, .account__menuCollapsed .account__profile > span, .account__menuCollapsed .account__profile h1, .account__menuCollapsed .account__profile p, .account__menuCollapsed .account__navigation button span, .account__menuCollapsed .account__navigation button b, .account__menuCollapsed .account__sidebarFooter { display: none; }
.account__menuCollapsed .account__profile { margin: 42px 0 22px; display: grid; place-items: center; }
.account__menuCollapsed .account__avatar { width: 38px; height: 38px; margin: 0; font-size: 14px; }
.account__menuCollapsed .account__navigation button { display: grid; grid-template-columns: 1fr; justify-items: center; padding: 14px 8px; }
.account__menuCollapsed .account__navigation button span { color: #8a8a84; }
.account__menuCollapsed .account__navigation .account__activeTab span { color: #b6ff1a; }
.account__content { min-width: 0; }
.account__header { height: 92px; padding: 0 46px; border-bottom: 1px solid #d4d4ce; display: flex; align-items: center; justify-content: space-between; }
.account__header div { display: grid; gap: 4px; }
.account__header span { color: #85857f; font-size: 9px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
.account__header strong { font-size: 16px; }
.account__shopLink { padding: 12px 16px; background: #111; color: #fff; font-size: 10px; font-weight: 800; text-transform: uppercase; }
.account__overview { padding: 42px 46px; display: grid; gap: 30px; }
.account__welcome { min-height: 370px; padding: clamp(35px, 6vw, 76px); background: #171715; color: #fff; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
.account__welcome::after { content: ""; position: absolute; width: 440px; height: 440px; right: -140px; top: -110px; border: 70px solid #21211e; border-radius: 50%; box-shadow: 0 0 0 1px #353531, 0 0 0 100px #191917; }
.account__welcome > * { position: relative; z-index: 1; }
.account__welcome > span { color: #b6ff1a; font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.account__welcome h2 { max-width: 720px; margin: 14px 0 18px; font-size: clamp(42px, 6vw, 78px); line-height: .9; letter-spacing: -.05em; text-transform: uppercase; }
.account__welcome p { max-width: 590px; color: #a0a09a; font-size: 14px; line-height: 1.6; }
.account__welcome div { display: flex; gap: 10px; margin-top: 18px; }
.account__welcome div a { padding: 13px 16px; border: 1px solid #44443f; color: #fff; font-size: 9px; font-weight: 800; text-transform: uppercase; }
.account__welcome div a:first-child { border-color: #b6ff1a; background: #b6ff1a; color: #111; }
.account__summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #d6d6d0; border: 1px solid #d6d6d0; }
.account__summary article { min-height: 160px; padding: 24px; background: #f8f8f5; display: flex; flex-direction: column; }
.account__summary span { color: #777771; font-size: 9px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.account__summary strong { margin: auto 0 7px; font-size: 42px; line-height: 1; }
.account__summary small { color: #85857f; font-size: 10px; }
.account__discovery { padding: 30px; border: 1px solid #d4d4ce; display: flex; align-items: end; justify-content: space-between; gap: 30px; }
.account__discovery span { color: #777771; font-size: 9px; font-weight: 800; text-transform: uppercase; }
.account__discovery h3 { max-width: 650px; margin: 8px 0 0; font-size: clamp(25px, 4vw, 44px); line-height: .95; text-transform: uppercase; }
.account__discovery > a { flex: none; color: #111; font-size: 10px; font-weight: 800; text-transform: uppercase; }
.account__emptyState { min-height: calc(100vh - 92px); padding: 50px; display: grid; place-content: center; justify-items: center; text-align: center; }
.account__emptyState > span { color: #aaa; font-size: 9px; font-weight: 800; letter-spacing: .13em; }
.account__emptyState h2 { max-width: 650px; margin: 16px 0; font-size: clamp(42px, 6vw, 78px); line-height: .9; text-transform: uppercase; }
.account__emptyState p { max-width: 470px; color: #74746e; font-size: 14px; line-height: 1.6; }
.account__emptyState a { margin-top: 18px; padding: 14px 18px; background: #111; color: #fff; font-size: 9px; font-weight: 800; text-transform: uppercase; }
.account__ordersPanel { padding: 38px 46px; }
.account__orderSuccess { margin: 0 0 22px; padding: 14px 16px; border-left: 3px solid #83c900; background: #e5f9bd; font-size: 12px; }
.account__ordersFeedback, .account__ordersError { padding: 28px; color: #777; text-align: center; }
.account__ordersError { color: #a52a21; }
.account__orderList { display: grid; gap: 18px; }
.account__orderCard { border: 1px solid #d2d2cc; background: #f8f8f5; }
.account__orderCard > header { padding: 18px 20px; border-bottom: 1px solid #d2d2cc; display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 24px; align-items: center; }
.account__orderCard > header div { display: grid; gap: 4px; }
.account__orderCard > header div span { color: #85857f; font-size: 8px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.account__orderCard > header div strong { font-size: 11px; }
.account__orderStatus { padding: 8px 10px; background: #111; color: #b6ff1a; font-size: 8px; font-weight: 800; text-transform: uppercase; }
.account__orderItems { padding: 5px 20px; }
.account__orderItems > div { display: grid; grid-template-columns: 55px 1fr auto; gap: 14px; align-items: center; padding: 13px 0; border-bottom: 1px solid #dfdfda; }
.account__orderItems > div:last-child { border-bottom: 0; }
.account__orderItems img { width: 55px; height: 64px; background: #171715; object-fit: contain; }
.account__orderItems span { display: grid; gap: 4px; }
.account__orderItems b { font-size: 12px; text-transform: uppercase; }
.account__orderItems small { color: #777; font-size: 10px; }
.account__orderItems > div > strong { font-size: 12px; }
.account__orderCard > footer { padding: 12px 20px; border-top: 1px solid #d2d2cc; color: #666; font-size: 10px; text-align: right; }
@media (max-width: 820px) { .account__accountPage, .account__accountPage.account__menuCollapsed { grid-template-columns: 1fr; } .account__sidebar, .account__menuCollapsed .account__sidebar { min-height: auto; padding: 22px; } .account__menuCollapsed .account__sidebarHeader { justify-content: space-between; } .account__menuCollapsed .account__brand { display: initial; } .account__menuCollapsed .account__profile { display: none; } .account__menuCollapsed .account__navigation { display: none; } .account__profile { margin-top: 36px; } .account__navigation { grid-template-columns: repeat(2, 1fr); } .account__sidebarFooter { margin-top: 28px; } .account__overview { padding: 24px; } }
@media (max-width: 560px) { .account__header { padding: 0 20px; } .account__overview, .account__ordersPanel { padding: 14px; } .account__welcome { min-height: 420px; padding: 28px 22px; } .account__welcome div { flex-direction: column; align-items: flex-start; } .account__summary { grid-template-columns: 1fr; } .account__discovery { align-items: flex-start; flex-direction: column; } .account__emptyState { padding: 28px; } .account__orderCard > header { grid-template-columns: 1fr 1fr; } .account__orderStatus { justify-self: start; } }

`;

export const Avatar = styled.div.attrs({ className: "account__avatar" })``;
export const Brand = styled(Link).attrs({ className: "account__brand" })``;
export const CollapseButton = styled.button.attrs({ className: "account__collapseButton" })``;
export const Content = styled.section.attrs({ className: "account__content" })``;
export const Discovery = styled.section.attrs({ className: "account__discovery" })``;
export const EmptyState = styled.div.attrs({ className: "account__emptyState" })``;
export const Header = styled.header.attrs({ className: "account__header" })``;
export const Navigation = styled.nav.attrs({ className: "account__navigation" })``;
export const OrderCard = styled.article.attrs({ className: "account__orderCard" })``;
export const OrderItems = styled.div.attrs({ className: "account__orderItems" })``;
export const OrderList = styled.div.attrs({ className: "account__orderList" })``;
export const OrdersError = styled.p.attrs({ className: "account__ordersError" })``;
export const OrdersFeedback = styled.p.attrs({ className: "account__ordersFeedback" })``;
export const OrdersPanel = styled.div.attrs({ className: "account__ordersPanel" })``;
export const OrderStatus = styled.span.attrs({ className: "account__orderStatus" })``;
export const OrderSuccess = styled.p.attrs({ className: "account__orderSuccess" })``;
export const Overview = styled.div.attrs({ className: "account__overview" })``;
export const Profile = styled.div.attrs({ className: "account__profile" })``;
export const ShopLink = styled(Link).attrs({ className: "account__shopLink" })``;
export const Sidebar = styled.aside.attrs({ className: "account__sidebar" })``;
export const SidebarFooter = styled.div.attrs({ className: "account__sidebarFooter" })``;
export const SidebarHeader = styled.div.attrs({ className: "account__sidebarHeader" })``;
export const Summary = styled.section.attrs({ className: "account__summary" })``;
export const TabIcon = styled.svg.attrs({ className: "account__tabIcon" })``;
export const Welcome = styled.section.attrs({ className: "account__welcome" })``;

export const AccountPage = styled.main.attrs<{ $collapsed: boolean }>(({ $collapsed }) => ({
  className: `account__accountPage${$collapsed ? " account__menuCollapsed" : ""}`,
}))``;

export const NavigationButton = styled.button.attrs<{ $active: boolean }>(({ $active }) => ({
  className: $active ? "account__activeTab" : undefined,
}))``;

