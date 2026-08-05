export type StockStatus = "available" | "preorder";

export interface Product {
  id: string;
  category: "fantasia" | "scifi" | "games" | "personalizados";
  categoryLabel: string;
  name: string;
  scale: string;
  material: string;
  price: number;
  tag: string;
  stock: StockStatus;
  imageUrl: string;
  alt: string;
}

export interface CartLine {
  id: string;
  qty: number;
}
