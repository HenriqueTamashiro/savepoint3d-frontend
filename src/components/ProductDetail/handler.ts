export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function paymentCalc(price: number): string {
  const instalmment = price / 10;
  return formatPrice(instalmment);
}

export function increaseQuantity(quantity: number, maximum: number | null) {
  if (maximum === null) return quantity + 1;
  if (maximum === 0) return quantity;
  if (quantity === maximum) return quantity;
  const result = quantity <= maximum ? quantity + 1 : maximum;
  return result;
}

export function descreaseQuantity(quantity: number, minumium = 1) {
  return Math.max(quantity - 1, minumium);
}
