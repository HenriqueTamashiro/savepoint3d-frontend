import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.header {
  position: sticky;
  top: 0;
  z-index: 150;
  background: rgba(242, 242, 240, 0);
  border-bottom: 1px solid transparent;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.headerScrolled {
  background: rgba(242, 242, 240, 0.85);
  backdrop-filter: blur(10px);
  border-bottom-color: var(--color-border);
}

.inner {
  width: 100%;
  min-width: 0;
  max-width: 1600px;
  margin: 0 auto;
  padding: 10px 40px;
  min-height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logoLink {
  display: flex;
  align-items: center;
}

.logo {
  height: 72px;
  max-height: 72px;
  width: auto;
  object-fit: contain;
}

@media (max-width: 1280px) {
  .inner {
    padding-inline: 22px;
  }
}

@media (max-width: 1099px) {
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    background: rgba(242, 242, 240, 0.96);
    backdrop-filter: blur(10px);
  }

  .inner {
    min-height: 84px;
    height: 84px;
    padding-block: 6px;
  }

  .logo {
    max-height: 68px;
  }

  .mobileHeaderSpacer {
    width: 100%;
    height: 84px;
    flex: 0 0 84px;
  }
}

@media (max-width: 520px) {
  .inner {
    min-height: 84px;
    padding: 8px 16px;
    gap: 12px;
  }

  .logoLink {
    min-width: 0;
  }

  .logo {
    width: auto;
    max-width: min(190px, 52vw);
    height: auto;
    max-height: 66px;
  }
}

.mobileMenu {
  position: fixed;
  inset: 0;
  background-color: var(--color-bg);
  background-image: radial-gradient(#c7c7c1 1px, transparent 1px);
  background-size: 18px 18px;
  background-position: 0 0;
  z-index: 200;
  padding: 28px 32px;
  overflow-y: auto;
}

.closeButton {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  float: right;
}

.mobileNav {
  display: flex;
  flex-direction: column;
  gap: clamp(17px, 4vh, 28px);
  margin-top: 60px;
}

.mobileNavLink {
  overflow-wrap: anywhere;
  font-size: clamp(22px, 7vw, 34px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 36px;
}

.navLink {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.iconButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  position: relative;
  font-size: 18px;
}

.loggedAccount {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 180px;
}

.accountAvatar {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-ink);
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}

.accountName {
  overflow: hidden;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.loggedAccount:hover .accountAvatar {
  background: var(--color-accent);
  color: var(--color-ink);
}

.accountMenuWrap {
  position: relative;
}

.accountChevron {
  color: #777771;
  font-size: 14px;
  line-height: 1;
  transition: transform 0.18s ease;
}

.accountChevronOpen {
  transform: rotate(180deg);
}

.accountDropdown {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  width: min(230px, calc(100vw - 32px));
  padding: 8px;
  border: 1px solid #343430;
  background: #111;
  color: #f5f5f1;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
  z-index: 20;
}

.accountDropdown::before {
  content: "";
  position: absolute;
  width: 9px;
  height: 9px;
  top: -6px;
  right: 20px;
  border-top: 1px solid #343430;
  border-left: 1px solid #343430;
  background: #111;
  transform: rotate(45deg);
}

.accountDropdownHeader {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;
  padding: 10px 9px 14px;
  border-bottom: 1px solid #30302d;
}

.accountDropdownHeader > span {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent);
  color: #111;
  font-size: 12px;
  font-weight: 900;
}

.accountDropdownHeader > div {
  min-width: 0;
  display: grid;
  gap: 3px;
}

.accountDropdownHeader b {
  overflow: hidden;
  font-size: 11px;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.accountDropdownHeader small {
  color: #6f6f69;
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.accountDropdown > a,
.accountDropdown > button {
  width: 100%;
  display: block;
  padding: 11px 10px;
  border: 0;
  background: transparent;
  color: #aaa9a3;
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
}

.accountDropdown > a:hover,
.accountDropdown > button:hover,
.accountDropdown > a:focus-visible,
.accountDropdown > button:focus-visible {
  background: #1d1d1a;
  color: var(--color-accent);
  outline: none;
}

.accountDropdown > button {
  margin-top: 5px;
  border-top: 1px solid #30302d;
  color: #d18880;
}

.mobileLogout {
  padding: 0;
  border: 0;
  background: transparent;
  color: #a1281e;
  text-align: left;
  cursor: pointer;
}

@media (max-width: 1280px) {
  .nav {
    gap: 20px;
  }

  .actions {
    gap: 10px;
  }

  .accountName {
    max-width: 90px;
  }
}

.cartBadge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--color-accent);
  color: var(--color-ink);
  font-size: 10px;
  font-weight: 800;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

`;

const styles = {
  "accountAvatar": "accountAvatar",
  "accountChevron": "accountChevron",
  "accountChevronOpen": "accountChevronOpen",
  "accountDropdown": "accountDropdown",
  "accountDropdownHeader": "accountDropdownHeader",
  "accountMenuWrap": "accountMenuWrap",
  "accountName": "accountName",
  "actions": "actions",
  "cartBadge": "cartBadge",
  "closeButton": "closeButton",
  "header": "header",
  "headerScrolled": "headerScrolled",
  "iconButton": "iconButton",
  "inner": "inner",
  "loggedAccount": "loggedAccount",
  "logo": "logo",
  "logoLink": "logoLink",
  "mobileHeaderSpacer": "mobileHeaderSpacer",
  "mobileLogout": "mobileLogout",
  "mobileMenu": "mobileMenu",
  "mobileNav": "mobileNav",
  "mobileNavLink": "mobileNavLink",
  "nav": "nav",
  "navLink": "navLink",
} as const;

export default styles;
