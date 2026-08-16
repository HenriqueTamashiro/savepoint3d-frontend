import { Product, ApiProduct } from "../types/product";
import { Post, PostType } from "../types/post";
import { authenticatedFetch } from "./auth";

// Stub service layer. Swap the bodies below for real fetch() calls to your backend
// once the API exists (e.g. GET /api/products, POST /api/cart, POST /api/leads).

export async function fetchProducts(category?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  const query = params.size ? `?${params.toString()}` : "";
  const Item = await fetch(`/api/items${query}`);

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

export async function fetchPost(
  filters: { type?: PostType; category?: string } = {},
): Promise<Post[]> {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.category) params.set("category", filters.category);
  const query = params.size ? `?${params.toString()}` : "";
  const Post = await fetch(`/api/posts${query}`);

  if (!Post.ok) {
    throw new Error("Erro");
  }

  return Post.json() as Promise<Post[]>;
}

async function readApiError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string | string[] };
    return Array.isArray(data.message)
      ? data.message.join(" ")
      : (data.message ?? "Não foi possível concluir a operação.");
  } catch {
    return "Não foi possível concluir a operação.";
  }
}

function adminHeaders(contentType = true): HeadersInit {
  return {
    ...(contentType ? { "Content-Type": "application/json" } : {}),
  };
}

export async function persistPost(post: Post): Promise<Post> {
  const isNew = post.id.startsWith("local-");
  const response = await authenticatedFetch(
    isNew ? "/api/posts" : `/api/posts/${post.id}`,
    {
      method: isNew ? "POST" : "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({
        title: post.title,
        content: post.content ?? "",
        type: post.type,
        tag: post.tag ?? "",
        imageUrl: post.imageUrl || undefined,
        url: post.url || undefined,
        show: post.show !== false,
      }),
    },
  );
  if (!response.ok) throw new Error(await readApiError(response));
  return response.json() as Promise<Post>;
}

export async function uploadPostImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const response = await authenticatedFetch("/api/uploads/images", {
    method: "POST",
    headers: adminHeaders(false),
    body: formData,
  });
  if (!response.ok) throw new Error(await readApiError(response));
  const data = (await response.json()) as { url: string };
  return data.url;
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
