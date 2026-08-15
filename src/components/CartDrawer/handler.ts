import { useMemo, useState } from 'react';
import { CartLine, Product } from '../../types/product';
import { applyCoupon as applyCouponApi } from '../../services/api';

export function useCartDrawer(cart: CartLine[], products: Product[], initialCouponCode: string, onCouponApplied: (code: string) => void) {
  const [couponCode, setCouponCode] = useState(initialCouponCode);
  const [couponMessage, setCouponMessage] = useState('');
  const [discount, setDiscount] = useState(0);

  const lines = useMemo(
    () =>
      cart.flatMap((line) => {
        const product = products.find((p) => p.id === line.id);
        return product ? [{ ...line, product, lineTotal: product.price * line.qty }] : [];
      }),
    [cart, products]
  );

  const subtotalRaw = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const subtotal = subtotalRaw * (1 - discount);

  async function applyCoupon() {
    const res = await applyCouponApi(couponCode);
    if (res.valid) {
      setDiscount(res.discount);
      onCouponApplied(couponCode.trim().toUpperCase());
      setCouponMessage('Cupom aplicado — 10% de desconto.');
    } else {
      setDiscount(0);
      onCouponApplied('');
      setCouponMessage('Cupom inválido ou expirado.');
    }
  }

  return { lines, subtotal, couponCode, setCouponCode, couponMessage, applyCoupon };
}
