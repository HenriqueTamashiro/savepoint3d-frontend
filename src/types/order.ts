export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PRODUCING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  imageUrl: string | null;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
