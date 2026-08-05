import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { fetchProducts } from "../../services/api";

const DESTAQUES_IDS = ["product-003", "product-004", "product-005"];
const api = import.meta.env.VITE_API_URL;

const resposne = await fetch(`${api}/users`);
const valor = resposne.json();
console.log(valor);

export function useHomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const destaques = products.filter((p) => DESTAQUES_IDS.includes(p.id));

  return { destaques };
}

export const CATEGORIES = [
  {
    index: "01",
    name: "Action Figures",
    imageUrl: "/assets/img/1.png",
    tall: true,
    href: "/colecao?categoria=fantasia",
  },
  {
    index: "02",
    name: "Estátuas",
    imageUrl: null,
    tall: false,
    href: "/colecao",
  },
  {
    index: "03",
    name: "Mechas",
    imageUrl: "/assets/img/6.png",
    tall: true,
    href: "/colecao?categoria=scifi",
  },
  {
    index: "04",
    name: "Bustos",
    imageUrl: null,
    tall: false,
    href: "/colecao",
  },
  {
    index: "05",
    name: "Dioramas",
    imageUrl: "/assets/img/7.png",
    tall: true,
    href: "/colecao#dioramas",
  },
  {
    index: "06",
    name: "Toy Art",
    imageUrl: null,
    tall: false,
    href: "/colecao",
  },
  {
    index: "07",
    name: "Personalizados",
    imageUrl: null,
    tall: false,
    href: "/personalizados",
  },
];
