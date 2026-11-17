export interface ProductImageInput {
  imageUrl: string;
  alt?: string | null;
}

export interface ProductImage extends ProductImageInput {
  id: string;
  position: number;
}

export type ItemLocation = "FEATURED" | "CATEGORIES" | "CUSTOM";

export interface Product {
  galleryImages: ProductImage[];
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  scale: string;
  material: string;
  price: number;
  tag: string;
  stock: number | null;
  imageUrl: string;
  alt: string;
  location: ItemLocation | null;
}

export interface CartLine {
  id: string;
  qty: number;
}

export interface ApiProduct {
  galleryImages?: ProductImage[];
  id: string;
  postId: string;
  category: string;
  categoryLabel: string | null;
  name: string | null;
  scale: string | null;
  material: string | null;
  price: string;
  tag: string | null;
  stock: number | null;
  imageUrl: string | null;
  alt: string | null;
  location: ItemLocation | null;
}
