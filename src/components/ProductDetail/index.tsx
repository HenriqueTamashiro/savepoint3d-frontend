import { Product } from "../../types/product";
import * as S from "../../style/pages/Products.styles";
import useGetProduct from "../../hooks/useUrlParser";
import stylesProduct, { ProductStyle } from "../../style/components/Product";
import { useEffect, useState } from "react";
import { formatPrice, paymentCalc } from "./handler";

interface ItemProps {
  products: Product[];
  onAddToCart: (id: string) => void;
}

export default function ProductDetail({ products, onAddToCart }: ItemProps) {
  const productDetailed = useGetProduct(products);
  const [imageProduct, setImageProduct] = useState(0);

  useEffect(() => {}, []);

  if (!productDetailed) {
    return <S.Page>Produto não encontrado</S.Page>;
  }

  return (
    <ProductStyle>
      <section>
        <div className={stylesProduct.wrapper}>
          <div key={productDetailed?.id} className={stylesProduct.article}>
            <div className={stylesProduct.gallery}>
              <img
                src={productDetailed?.imageUrl}
                className={stylesProduct.img}
              />
              <img
                src={productDetailed?.imageUrl}
                className={stylesProduct.img}
              />
              <img
                src={productDetailed?.imageUrl}
                className={stylesProduct.img}
              />
            </div>
            <div className={stylesProduct.productImage}>
              <img src={productDetailed?.imageUrl} />
            </div>

            <article className={stylesProduct.infoSector}>
              <div className={stylesProduct.titleArea}>
                <div className={stylesProduct.informative}>
                  <span className={stylesProduct.material}>
                    {productDetailed.categoryLabel} -{" "}
                    <span>{productDetailed.scale}</span>
                  </span>
                  <div className={stylesProduct.stock}>
                    {productDetailed.stock} Uni.
                  </div>
                </div>
                <div className={stylesProduct.nameArea}>
                  <div className={stylesProduct.name}>
                    {productDetailed.name}
                  </div>
                  <text>Avaliação: * * * *</text>
                </div>
              </div>

              <div className={stylesProduct.textArea}>
                <text>
                  {`Lorem ipsum dolor sit amet consectetur, 
              adipisicing elit. Blanditiis laborum harum ex mollitia iusto 
              odio impedit quibusdam delectus doloribus debitis accusantium 
              quasi, dolor velit nesciunt? Voluptas delectus inventore 
              quisquam ullam.`}
                </text>
              </div>

              <div className={stylesProduct.priceArea}>
                <div>
                  <span>OFERTA</span>
                  <span className={stylesProduct.offer}> De: R$1000,00</span>
                </div>
                <span className={stylesProduct.price}>
                  {`${formatPrice(productDetailed.price)}`}
                </span>
                <span className={stylesProduct.payment}>
                  {`Em até `}
                  <span className={stylesProduct.installmments}>
                    10x sem juros de
                    {` ${paymentCalc(productDetailed.price)}`}
                  </span>
                </span>
              </div>

              <div>
                <button onClick={() => onAddToCart(productDetailed.id)}>
                  Adicionar ao carrinho
                </button>
                <button onClick={() => onAddToCart(productDetailed.id)}>
                  Comprar
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </ProductStyle>
  );
}
