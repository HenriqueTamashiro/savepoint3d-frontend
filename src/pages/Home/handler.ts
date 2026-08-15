import { useCallback, useEffect, useRef, useState } from "react";
import { Product } from "../../types/product";
import { Post, PostType } from "../../types/post";
import { fetchProducts, fetchPost } from "../../services/api";

export function postManager(posts: Post[]): Record<PostType, Post[]> {
  const postTypes = Object.fromEntries(
    Object.values(PostType).map((type) => [type, [] as Post[]]),
  ) as Record<PostType, Post[]>;

  for (const value of posts) {
    if (value.show !== false) {
      postTypes[value.type].push(value);
    }
  }
  return postTypes;
}

export function useHomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadHomeData() {
      const [fetchedProducts, fetchedPosts] = await Promise.all([
        fetchProducts(),
        fetchPost(),
      ]);

      setProducts(fetchedProducts);
      setPosts(fetchedPosts);
    }

    void loadHomeData();
  }, []);

  const destaques = products.filter(
    (product) => product.location === "FEATURED",
  );

  const postsByType = postManager(posts);

  return {
    destaques,
    products,
    postsByType,
  };
}

type CarouselDirection = -1 | 1;

export function useFeaturedCarousel(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateControls = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const endPosition = track.scrollWidth - track.clientWidth;
    const tolerance = 2;

    setCanScrollPrevious(track.scrollLeft > tolerance);
    setCanScrollNext(track.scrollLeft < endPosition - tolerance);
  }, []);

  const scrollOneItem = useCallback((direction: CarouselDirection) => {
    const track = trackRef.current;
    const firstItem = track?.firstElementChild as HTMLElement | null;

    if (!track || !firstItem) return;

    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap) || 0;

    track.scrollBy({
      left: direction * (firstItem.offsetWidth + gap),
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const resizeObserver = new ResizeObserver(updateControls);
    const animationFrame = window.requestAnimationFrame(updateControls);

    resizeObserver.observe(track);
    track.addEventListener("scroll", updateControls, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      track.removeEventListener("scroll", updateControls);
    };
  }, [itemCount, updateControls]);

  return {
    trackRef,
    canScrollPrevious,
    canScrollNext,
    scrollOneItem,
  };
}
