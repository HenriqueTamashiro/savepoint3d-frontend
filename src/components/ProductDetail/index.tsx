import { Product } from "../../types/product";
import * as S from "../../style/pages/Products.styles";
import useGetProduct from "../../hooks/useUrlParser";
import stylesProduct, { ProductStyle } from "../../style/components/Product";
import { useState } from "react";
import {
  formatPrice,
  paymentCalc,
  increaseQuantity,
  descreaseQuantity,
} from "./handler";

interface ItemProps {
  products: Product[];
  onAddToCart: (id: string, quantity: number) => void;
}

export default function ProductDetail({ products, onAddToCart }: ItemProps) {
  const productDetailed = useGetProduct(products);
  const [imageProduct, setImageProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!productDetailed) {
    return <S.Page>Produto não encontrado</S.Page>;
  }

  function showImg(imgUrl: string): void {
    setImageProduct(imgUrl);
  }

  return (
    <ProductStyle>
      <section>
        <div className={stylesProduct.wrapper}>
          <div key={productDetailed?.id} className={stylesProduct.article}>
            <div className={stylesProduct.gallery}>
              <img
                src={"/assets/img/1.png"}
                className={stylesProduct.img}
                onClick={() => showImg("/assets/img/1.png")}
              />
              <img
                src={productDetailed?.imageUrl}
                className={stylesProduct.img}
                onClick={() => showImg(productDetailed.imageUrl)}
              />
              <img
                src={productDetailed?.imageUrl}
                className={stylesProduct.img}
              />
            </div>
            <div className={stylesProduct.productImage}>
              <img src={imageProduct ?? productDetailed.imageUrl} />
            </div>

            <article className={stylesProduct.infoSector}>
              <div className={stylesProduct.titleArea}>
                <div className={stylesProduct.informative}>
                  <span className={stylesProduct.material}>
                    {productDetailed.categoryLabel} - {productDetailed.scale}
                  </span>
                  <div className={stylesProduct.stock}>
                    {productDetailed.stock} Uni.
                  </div>
                </div>
                <div className={stylesProduct.nameArea}>
                  <div className={stylesProduct.name}>
                    {productDetailed.name}
                  </div>
                  <text>Avaliação: </text>
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
                  <span className={stylesProduct.tagOffer}>OFERTA</span>
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

              <div className={stylesProduct.buttonArea}>
                <div className={stylesProduct.quantityButton}>
                  <button
                    onClick={() => setQuantity(descreaseQuantity(quantity))}
                  >
                    -
                  </button>
                  <output>{quantity}</output>
                  <button
                    onClick={() =>
                      setQuantity(
                        increaseQuantity(quantity, productDetailed.stock),
                      )
                    }
                    disabled={quantity < 1}
                  >
                    +
                  </button>
                </div>
                <button
                  className={stylesProduct.addButton}
                  onClick={() => onAddToCart(productDetailed.id, quantity)}
                >
                  Adicionar ao carrinho
                </button>
                <></>
                <button
                  className={stylesProduct.buyButton}
                  onClick={() => onAddToCart(productDetailed.id, quantity)}
                >
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
