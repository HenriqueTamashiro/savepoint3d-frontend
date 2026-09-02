export function formatPrice(value: number): string {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

export function paymentCalc(price: number): string {
  const instalmment = price / 10;
  return `R$ ${String(instalmment)}`;
}

export function increaseQuantity(quantity: number, maximum: number | null) {
  if (!maximum) return 0;
  if (quantity === maximum) return quantity;
  const result = quantity <= maximum ? quantity + 1 : maximum;
  return result;
}

export function descreaseQuantity(quantity: number, minumium = 1) {
  return Math.max(quantity - 1, minumium);
}
