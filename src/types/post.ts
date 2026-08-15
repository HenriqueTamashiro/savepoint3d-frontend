export enum PostType {
  FIGURE = "FIGURE",
  ARTICLE = "ARTICLE",
  VIDEO = "VIDEO",
  PROJECT = "PROJECT",
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string | null;
  type: PostType;
  tag: string | null;
  imageUrl: string | null;
  url?: string | null;
  show?: boolean;
}
