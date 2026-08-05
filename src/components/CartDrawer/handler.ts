import { useMemo, useState } from 'react';
import { CartLine, Product } from '../../types/product';
import { applyCoupon as applyCouponApi } from '../../services/api';

export function useCartDrawer(cart: CartLine[], products: Product[], onIncQty: (id: string) => void, onDecQty: (id: string) => void, onRemove: (id: string) => void) {
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [discount, setDiscount] = useState(0);

  const lines = useMemo(
    () =>
      cart.map((line) => {
        const product = products.find((p) => p.id === line.id)!;
        return { ...line, product, lineTotal: product.price * line.qty };
      }),
    [cart, products]
  );

  const subtotalRaw = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const subtotal = subtotalRaw * (1 - discount);

  async function applyCoupon() {
    const res = await applyCouponApi(couponCode);
    if (res.valid) {
      setDiscount(res.discount);
      setCouponMessage('Cupom aplicado — 10% de desconto.');
    } else {
      setDiscount(0);
      setCouponMessage('Cupom inválido ou expirado.');
    }
  }

  return { lines, subtotal, couponCode, setCouponCode, couponMessage, applyCoupon, onIncQty, onDecQty, onRemove };
}
