import type { ApiProduct, Product } from "../types/product";

export function normalizeProduct(product: ApiProduct): Product {
  const price = Number(product.price);
  if (!Number.isFinite(price)) throw new Error("Preço incorreto!");
  return {
    ...product,
    price,
    categoryLabel: product.categoryLabel ?? product.category,
    name: product.name ?? "Produto",
    scale: product.scale ?? "",
    material: product.material ?? "",
    tag: product.tag ?? "",
    imageUrl: product.imageUrl ?? "",
    alt: product.alt ?? "",
    galleryImages: [...(product.galleryImages ?? [])].sort(
      (a, b) => a.position - b.position || a.id.localeCompare(b.id),
    ),
  };
}

export function productDisplayImages(product: Product) {
  const images = product.galleryImages.map((image) => ({
    imageUrl: image.imageUrl,
    alt: image.alt || product.alt || product.name,
  }));
  if (product.imageUrl && !images.some((image) => image.imageUrl === product.imageUrl)) {
    images.unshift({ imageUrl: product.imageUrl, alt: product.alt || product.name });
  }
  return images;
}
