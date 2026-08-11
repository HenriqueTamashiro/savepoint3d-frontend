import { Product, ApiProduct } from "../types/product";
import { Post } from "../types/post";

// Stub service layer. Swap the bodies below for real fetch() calls to your backend
// once the API exists (e.g. GET /api/products, POST /api/cart, POST /api/leads).

export async function fetchProducts(): Promise<Product[]> {
  const Item = await fetch("/api/Teste/post/items");

  if (!Item.ok) {
    throw new Error("Erro");
  }

  const dataTyped: ApiProduct[] = await Item.json();

  return dataTyped.map((items) => {
    const price = Number(items.price);

    if (!Number.isFinite(price)) {
      throw new Error("Preço incorreto!");
    }
    return {
      ...items,
      price,
    };
  });
}

export async function fetchPost(): Promise<Post[]> {
  const Post = await fetch("/api/Teste/post");

  if (!Post.ok) {
    throw new Error("Erro");
  }

  const dataTyped: Post[] = await Post.json();

  return dataTyped.map((Posts) => {
    return {
      ...Posts,
    };
  });
}

export async function submitCustomRequest(payload: {
  nome: string;
  email: string;
  whatsapp: string;
  ideia: string;
  referenceImage?: File | null;
}): Promise<{ ok: boolean }> {
  console.log("submitCustomRequest payload", payload);
  return Promise.resolve({ ok: true });
}

export async function subscribeNewsletter(
  email: string,
): Promise<{ ok: boolean }> {
  console.log("subscribeNewsletter", email);
  return Promise.resolve({ ok: true });
}

export async function applyCoupon(
  code: string,
): Promise<{ valid: boolean; discount: number }> {
  if (code.trim().toUpperCase() === "SAVE10")
    return { valid: true, discount: 0.1 };
  return { valid: false, discount: 0 };
}
