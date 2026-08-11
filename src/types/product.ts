export type StockStatus = "available" | "preorder";
export type ItemLocation = "FEATURED" | "CATEGORIES" | "CUSTOM";

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
  location: ItemLocation | null;
}

export interface CartLine {
  id: string;
  qty: number;
}

export interface ApiProduct {
  id: string;
  postId: string;
  category: "fantasia" | "scifi" | "games" | "personalizados";
  categoryLabel: string;
  name: string;
  scale: string;
  material: string;
  price: string;
  tag: string;
  stock: StockStatus;
  imageUrl: string;
  alt: string;
  location: ItemLocation | null;
}
