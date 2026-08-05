import { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/product';
import { fetchProducts } from '../../services/api';

export const FILTERS = [
  { value: 'todos', label: 'Todos' },
  { value: 'fantasia', label: 'Fantasia' },
  { value: 'scifi', label: 'Ficção Científica' },
  { value: 'games', label: 'Jogos' },
  { value: 'personalizados', label: 'Personalizados' },
];

export function useColecaoPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState('todos');

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const filtered = useMemo(
    () => (activeFilter === 'todos' ? products : products.filter((p) => p.category === activeFilter)),
    [products, activeFilter]
  );

  return { filtered, activeFilter, setActiveFilter };
}
