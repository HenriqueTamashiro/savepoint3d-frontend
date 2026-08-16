import { Order, OrderStatus } from "./order";
import { ItemLocation, Product } from "./product";

export type AdminRole = "USER" | "MOD" | "ADMIN";

export interface AdminProduct extends Product {
  active: boolean;
  post: { id: string; title: string };
}

export interface AdminProductInput {
  category: string;
  categoryLabel: string;
  name: string;
  scale?: string;
  material?: string;
  price: string;
  tag?: string;
  stock: number | null;
  imageUrl?: string;
  alt?: string;
  location?: ItemLocation;
  active?: boolean;
}

export interface AdminUser {
  id: string;
  user: string;
  role: AdminRole;
  blocked: boolean;
  _count: { orders: number; posts: number };
}

export interface AdminUserInput {
  user?: string;
  role?: AdminRole;
  blocked?: boolean;
  password?: string;
}

export interface AdminOrder extends Order {
  user: { id: string; user: string };
}

export interface AdminOrderInput {
  status: OrderStatus;
}
