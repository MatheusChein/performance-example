import { memo } from 'react';

interface ProductItemProps {
  product: {
    price: number;
    title: string;
    id: number;
    formattedPrice: string;
  };
  onAddToWishList: (id: number) => void
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => onAddToWishList(product.id)}>Add to Wishlist</button>
    </div>
  )
}

// memo faz um shallow compare

// porém {} === {} é false, pois o js compara fazendo uma igualdade referencial, se ocupam a mesma posição na memória

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // esse método is() faz um deep comprae
  return Object.is(prevProps.product, nextProps.product)
})