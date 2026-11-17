import { productDisplayImages } from "../../services/product-adapter";
import { Product } from "../../types/product";
import * as S from "../../style/pages/Products.styles";
import useGetProduct from "../../hooks/useUrlParser";
import stylesProduct, { ProductStyle } from "../../style/components/Product";
import { useEffect, useRef, useState } from "react";
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

const VISIBLE_THUMBNAILS = 4;

export default function ProductDetail({ products, onAddToCart }: ItemProps) {
  const productDetailed = useGetProduct(products);
  const [selection, setSelection] = useState({ productId: "", index: 0 });
  const [quantity, setQuantity] = useState(1);
  const galleryRef = useRef<HTMLDivElement>(null);
  const images = productDetailed ? productDisplayImages(productDetailed) : [];
  const productId = productDetailed?.id;
  const imageCount = images.length;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || !productId || imageCount < 2) return;

    let lastStepAt = -Infinity;
    const navigateWithWheel = (event: WheelEvent) => {
      // Preserve browser zoom and horizontal trackpad gestures.
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0) return;

      event.preventDefault();
      const now = performance.now();
      if (now - lastStepAt < 180) return;
      lastStepAt = now;
      const direction = Math.sign(event.deltaY);

      setSelection((current) => {
        const index = current.productId === productId
          ? Math.min(current.index, imageCount - 1)
          : 0;
        return {
          productId,
          index: Math.max(0, Math.min(index + direction, imageCount - 1)),
        };
      });
    };

    // A non-passive listener lets the gallery consume wheel scrolling.
    gallery.addEventListener("wheel", navigateWithWheel, { passive: false });
    return () => gallery.removeEventListener("wheel", navigateWithWheel);
  }, [productId, imageCount]);

  if (!productDetailed) {
    return <S.Page>Produto não encontrado</S.Page>;
  }

  const activeIndex = selection.productId === productDetailed.id ? Math.min(selection.index, Math.max(0, images.length - 1)) : 0;
  const thumbnailStart = Math.max(0, activeIndex - VISIBLE_THUMBNAILS + 1);
  const visibleImages = images.slice(thumbnailStart, thumbnailStart + VISIBLE_THUMBNAILS);

  const showImg = (index: number): void => {
    setSelection({ productId: productDetailed.id, index });
  };

  return (
    <ProductStyle>
      <section>
        <div className={stylesProduct.wrapper}>
          <div key={productDetailed?.id} className={stylesProduct.article}>
            <div ref={galleryRef} className={stylesProduct.gallery} role="group" aria-label="Imagens do produto" title="Use a roda do mouse para navegar pelas imagens">
              <button
                type="button"
                className="galleryControl thumbnailPrevious"
                aria-label="Imagem anterior na galeria de miniaturas"
                disabled={activeIndex === 0}
                onClick={() => showImg(activeIndex - 1)}
              >
                <span aria-hidden="true">&#8249;</span>
              </button>
              <div className="thumbnailList">
              {visibleImages.map((image, offset) => {
                const index = thumbnailStart + offset;
                return (
                <button
                  key={index}
                  type="button"
                  className="thumbnail"
                  aria-label={`Mostrar imagem ${index + 1} de ${productDetailed.name}`}
                  aria-pressed={activeIndex === index}
                  aria-controls="product-detail-image"
                  onClick={() => showImg(index)}
                >
                  <img src={image.imageUrl} alt="" />
                </button>
                );
              })}
              </div>
              <button
                type="button"
                className="galleryControl thumbnailNext"
                aria-label="Próxima imagem na galeria de miniaturas"
                disabled={activeIndex >= images.length - 1}
                onClick={() => showImg(activeIndex + 1)}
              >
                <span aria-hidden="true">&#8250;</span>
              </button>
            </div>
            <div className={stylesProduct.productImage}>
              {images.length > 0 ? <img
                id="product-detail-image"
                src={images[activeIndex]?.imageUrl}
                alt={images[activeIndex]?.alt}
              /> : <p>Imagem indisponível</p>}
              <button
                type="button"
                className="galleryControl galleryPrevious"
                aria-label="Mostrar imagem anterior"
                disabled={activeIndex === 0}
                onClick={() => showImg(activeIndex - 1)}
              >
                &#8249;
              </button>
              <button
                type="button"
                className="galleryControl galleryNext"
                aria-label="Mostrar próxima imagem"
                disabled={activeIndex >= images.length - 1}
                onClick={() => showImg(activeIndex + 1)}
              >
                &#8250;
              </button>
              <span className="imageCounter" aria-live="polite" aria-atomic="true">
                {images.length ? activeIndex + 1 : 0} / {images.length}
              </span>
            </div>

            <article className={stylesProduct.infoSector}>
              <div className={stylesProduct.titleArea}>
                <div className={stylesProduct.nameArea}>
                  <h1 className={stylesProduct.name}>{productDetailed.name}</h1>
                </div>
                <p className="ratingLine">Avaliação: <span>Não disponível</span></p>
              </div>

              <div className={stylesProduct.textArea}>
                <p>{productDetailed.material}</p>
                <div className={stylesProduct.informative}>
                  <span className={stylesProduct.material}>
                    {productDetailed.categoryLabel} · {productDetailed.scale}
                  </span>
                  <div className={stylesProduct.stock}>
                    {productDetailed.stock === null
                      ? "Sob encomenda"
                      : productDetailed.stock === 0
                        ? "Esgotado"
                        : `${productDetailed.stock} ${productDetailed.stock === 1 ? "unidade disponível" : "unidades disponíveis"}`}
                  </div>
                </div>
              </div>

              <div className={stylesProduct.priceArea}>
                {productDetailed.tag && (
                  <span className={stylesProduct.tagOffer}>{productDetailed.tag}</span>
                )}
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
                    type="button"
                    aria-label="Diminuir quantidade"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(descreaseQuantity(quantity))}
                  >
                    -
                  </button>
                  <output>{quantity}</output>
                  <button
                    type="button"
                    aria-label="Aumentar quantidade"
                    onClick={() =>
                      setQuantity(
                        increaseQuantity(quantity, productDetailed.stock),
                      )
                    }
                    disabled={productDetailed.stock !== null && quantity >= productDetailed.stock}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  disabled={productDetailed.stock === 0}
                  className={stylesProduct.addButton}
                  onClick={() => onAddToCart(productDetailed.id, quantity)}
                >
                  Adicionar ao carrinho
                </button>
                <button
                  type="button"
                  disabled={productDetailed.stock === 0}
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
