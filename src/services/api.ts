import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';

// Stub service layer. Swap the bodies below for real fetch() calls to your backend
// once the API exists (e.g. GET /api/products, POST /api/cart, POST /api/leads).

export async function fetchProducts(): Promise<Product[]> {
  return Promise.resolve(PRODUCTS);
}

export async function submitCustomRequest(payload: {
  nome: string;
  email: string;
  whatsapp: string;
  ideia: string;
  referenceImage?: File | null;
}): Promise<{ ok: boolean }> {
  console.log('submitCustomRequest payload', payload);
  return Promise.resolve({ ok: true });
}

export async function subscribeNewsletter(email: string): Promise<{ ok: boolean }> {
  console.log('subscribeNewsletter', email);
  return Promise.resolve({ ok: true });
}

export async function applyCoupon(code: string): Promise<{ valid: boolean; discount: number }> {
  if (code.trim().toUpperCase() === 'SAVE10') return { valid: true, discount: 0.1 };
  return { valid: false, discount: 0 };
}
