import { Product } from "../../types/product";
import * as S from "../../style/pages/Products.styles";
import useGetProduct from "../../hooks/useUrlParser";
import styles from "../../style/components/ProductCard";
import stylesProduct, { ProductStyle } from "../../style/components/Product";

interface ItemProps {
  products: Product[];
  onAddToCart: (id: string) => void;
}

export default function ProductDetail({ products, onAddToCart }: ItemProps) {
  const productDetailed = useGetProduct(products);

  if (!productDetailed) {
    return <S.Page>Produto não encontrado</S.Page>;
  }

  return (
    <ProductStyle>
      <section className={ProductStyle}>
        <div key={productDetailed?.id}>
          <div>
            {productDetailed?.name}
            <span className={styles.tag}> {productDetailed?.tag}</span>
          </div>

          <div className={styles.imageWrap}>
            <img
              src={productDetailed?.imageUrl}
              className={stylesProduct.img}
            />
          </div>
          <button
            className={styles.addButton}
            type="button"
            onClick={() => onAddToCart(productDetailed?.id)}
          >
            Comprar
          </button>
        </div>
      </section>
    </ProductStyle>
  );
}
