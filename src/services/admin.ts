import {
  AdminOrder,
  AdminOrderInput,
  AdminProduct,
  AdminProductInput,
  AdminUser,
  AdminUserInput,
} from "../types/admin";
import { getAuthSession } from "./auth";

async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthSession()?.accessToken;
  if (!token) throw new Error("Sua sessão expirou. Entre novamente.");

  const response = await fetch(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(data?.message) ? data.message.join(" ") : data?.message;
    throw new Error(message ?? "Não foi possível concluir a operação administrativa.");
  }

  return response.json() as Promise<T>;
}

function normalizeProduct(product: AdminProduct & { price: number | string }): AdminProduct {
  return { ...product, price: Number(product.price) };
}

export async function fetchAdminProducts(): Promise<AdminProduct[]> {
  const products = await adminRequest<(AdminProduct & { price: number | string })[]>("/api/admin/products");
  return products.map(normalizeProduct);
}

export async function createAdminProduct(input: AdminProductInput): Promise<AdminProduct> {
  const product = await adminRequest<AdminProduct & { price: number | string }>("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return normalizeProduct(product);
}

export async function updateAdminProduct(id: string, input: AdminProductInput): Promise<AdminProduct> {
  const product = await adminRequest<AdminProduct & { price: number | string }>(`/api/admin/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return normalizeProduct(product);
}

export function removeAdminProduct(id: string): Promise<AdminProduct> {
  return adminRequest(`/api/admin/products/${id}`, { method: "DELETE" });
}

export function fetchAdminUsers(): Promise<AdminUser[]> {
  return adminRequest("/api/admin/users");
}

export function updateAdminUser(id: string, input: AdminUserInput): Promise<AdminUser> {
  return adminRequest(`/api/admin/users/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteAdminUser(id: string): Promise<{ id: string; deletedAt: string }> {
  return adminRequest(`/api/admin/users/${id}`, { method: "DELETE" });
}

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const orders = await adminRequest<AdminOrder[]>("/api/admin/orders");
  return orders.map((order) => ({
    ...order,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      lineTotal: Number(item.lineTotal),
    })),
  }));
}

export function updateAdminOrder(id: string, input: AdminOrderInput): Promise<AdminOrder> {
  return adminRequest(`/api/admin/orders/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}
