import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import { Post, PostType } from "../../types/post";
import { fetchProducts, fetchPost } from "../../services/api";

export function useHomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  useEffect(() => {
    fetchPost().then(setPosts);
  }, []);

  const destaques = products.filter(
    (product) => product.location === "FEATURED",
  );

  const category = posts.filter((post) => post.type === PostType.CATEGORY);

  return { destaques, category };
}

// export const CATEGORIES = [
//   {
//     index: "01",
//     name: "Action Figures",
//     imageUrl: "/assets/img/1.png",
//     tall: true,
//     href: "/colecao?categoria=fantasia",
//   },
//   {
//     index: "02",
//     name: "Estátuas",
//     imageUrl: null,
//     tall: false,
//     href: "/colecao",
//   },
//   {
//     index: "03",
//     name: "Mechas",
//     imageUrl: "/assets/img/6.png",
//     tall: true,
//     href: "/colecao?categoria=scifi",
//   },
//   {
//     index: "04",
//     name: "Bustos",
//     imageUrl: null,
//     tall: false,
//     href: "/colecao",
//   },
//   {
//     index: "05",
//     name: "Dioramas",
//     imageUrl: "/assets/img/7.png",
//     tall: true,
//     href: "/colecao#dioramas",
//   },
//   {
//     index: "06",
//     name: "Toy Art",
//     imageUrl: null,
//     tall: false,
//     href: "/colecao",
//   },
//   {
//     index: "07",
//     name: "Personalizados",
//     imageUrl: null,
//     tall: false,
//     href: "/personalizados",
//   },
// ];
