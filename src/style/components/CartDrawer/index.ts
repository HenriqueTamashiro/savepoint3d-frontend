import styled from "styled-components";

export const StyleScope = styled.div`
  display: contents;

.footer {
  padding: 24px 28px 28px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.couponRow {
  display: flex;
  gap: 8px;
}

.couponRow input {
  flex: 1;
  border: 1px solid var(--color-border);
  background: none;
  padding: 10px 12px;
  font-size: 13px;
}

.couponRow button {
  border: 1px solid var(--color-ink);
  background: none;
  font-size: 12px;
  font-weight: 700;
  padding: 0 16px;
  cursor: pointer;
  text-transform: uppercase;
}

.subtotalRow {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 800;
  padding-top: 6px;
}

.checkoutButton {
  border: 0;
  background: var(--color-ink);
  color: #f2f2f0;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 16px;
  cursor: pointer;
}

.checkoutButton:hover {
  background: var(--color-accent);
  color: var(--color-ink);
}

.checkoutButton:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.continueButton {
  background: none;
  border: 1px solid var(--color-border);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 14px;
  cursor: pointer;
}

.items {
  flex: 1;
  overflow-y: auto;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.empty {
  font-size: 14px;
  color: var(--color-muted);
  text-align: center;
  margin-top: 40px;
}

.item {
  display: flex;
  gap: 14px;
}

.itemImage {
  width: 70px;
  height: 88px;
  background: var(--color-ink-soft);
  flex-shrink: 0;
}

.itemImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
}

.itemInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.itemName {
  font-size: 14px;
  font-weight: 700;
}

.itemCategory {
  font-size: 11px;
  color: var(--color-muted);
  text-transform: uppercase;
}

.qtyRow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.qtyRow button {
  width: 22px;
  height: 22px;
  border: 1px solid var(--color-border);
  background: none;
  cursor: pointer;
  font-size: 14px;
}

.remove {
  margin-left: auto;
  font-size: 11px;
  color: var(--color-muted);
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

.itemTotal {
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(17, 17, 17, 0.5);
  z-index: 300;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 301;
  width: 420px;
  max-width: 92vw;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  transform: translateX(105%);
  visibility: hidden;
  pointer-events: none;
  transition: transform 0.35s ease, visibility 0s linear 0.35s;
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.18);
}

.drawer.open {
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
  transition-delay: 0s;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 28px;
  border-bottom: 1px solid var(--color-border);
}

.header button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

`;

const styles = {
  "checkoutButton": "checkoutButton",
  "continueButton": "continueButton",
  "couponMessage": "couponMessage",
  "couponRow": "couponRow",
  "drawer": "drawer",
  "empty": "empty",
  "footer": "footer",
  "header": "header",
  "item": "item",
  "itemCategory": "itemCategory",
  "itemImage": "itemImage",
  "itemInfo": "itemInfo",
  "itemName": "itemName",
  "itemTotal": "itemTotal",
  "items": "items",
  "open": "open",
  "overlay": "overlay",
  "qtyRow": "qtyRow",
  "remove": "remove",
  "subtotalRow": "subtotalRow",
} as const;

export default styles;
