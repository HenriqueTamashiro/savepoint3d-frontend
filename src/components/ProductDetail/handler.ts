export function formatPrice(value: number): string {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

export function paymentCalc(price: number): string {
  const instalmment = price / 10;
  return `R$ ${String(instalmment)}`;
}
