import styles from "../../style/components/CategoryCard";
import { Post } from "../../types/post";

interface CategoryCardProps {
  post: Post;
  index: number;
}

export default function CategoryCard({ post, index }: CategoryCardProps) {
  const displayIndex = String(index + 1).padStart(2, "0");
  const tall = index === 0 || index === 2 || index === 4;
  const showImage = index % 2 === 0 && Boolean(post.imageUrl);

  return (
    <a href="#" className={`${styles.card} ${tall ? styles.tall : ""}`}>
      {showImage && (
        <img
          src={post.imageUrl!}
          alt={post.title}
          loading="lazy"
          className={styles.bgImage}
        />
      )}

      <span className={styles.index}>{displayIndex}</span>

      <div className={styles.footer}>
        <h3 className={styles.name}>{post.title}</h3>
        <span className={styles.arrow}>→</span>
      </div>
    </a>
  );
}
