import { useState } from 'react';

export function useProductCardHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };
}

export function formatPrice(value: number): string {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}
