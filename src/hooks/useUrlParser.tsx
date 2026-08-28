import { useParams } from "react-router-dom";
import { Product } from "../types/product";

export default function useGetProduct(
  products: Product[],
): Product | undefined {
  const { productId } = useParams<{ productId: string }>();

  const selectedProduct = products.find((Item) => Item.id === productId);

  return selectedProduct;
}
