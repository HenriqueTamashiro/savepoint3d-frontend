import * as S from "../../style/pages/Products.styles";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";

import { Product } from "../../types/product";

interface ProductsProps {
  products: Product[];
  onAddToCart: (id: string) => void;
}

export default function Products({ products, onAddToCart }: ProductsProps) {
  function handleClick(id: string) {
    navigate(`/products/${id}`);
  }

  const navigate = useNavigate();
  return (
    <S.Page>
      <S.Content>
        <S.Grid>
          {products.map((p) => (
            <div onClick={() => handleClick(p.id)}>
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
              ></ProductCard>
            </div>
          ))}
        </S.Grid>
      </S.Content>
    </S.Page>
  );
}
