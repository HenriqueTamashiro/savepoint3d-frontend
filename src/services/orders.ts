import { CartLine } from "../types/product";
import { Order } from "../types/order";
import { authenticatedFetch } from "./auth";

async function authenticatedRequest(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const response = await authenticatedFetch(path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(data?.message)
      ? data.message.join(" ")
      : data?.message;
    throw new Error(message ?? "Não foi possível concluir o pedido.");
  }

  return response;
}

function normalizeOrder(order: Order): Order {
  return {
    ...order,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      lineTotal: Number(item.lineTotal),
    })),
  };
}

export async function createOrder(
  cart: CartLine[],
  couponCode: string,
): Promise<Order> {
  const response = await authenticatedRequest("/api/orders", {
    method: "POST",
    headers: { "Idempotency-Key": crypto.randomUUID() },
    body: JSON.stringify({
      items: cart.map((line) => ({
        productId: line.id,
        quantity: line.qty,
      })),
      couponCode: couponCode || undefined,
    }),
  });
  return normalizeOrder((await response.json()) as Order);
}

export async function fetchMyOrders(): Promise<Order[]> {
  const response = await authenticatedRequest("/api/orders/me");
  const orders = (await response.json()) as Order[];
  return orders.map(normalizeOrder);
}
