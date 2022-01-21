import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import { AddProductToWishListProps } from './AddProductToWishList';

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})
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
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      {isAddingToWishList && (
        <AddProductToWishList 
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

// memo faz um shallow compare

// porém {} === {} é false, pois o js compara fazendo uma igualdade referencial, se ocupam a mesma posição na memória

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  // esse método is() faz um deep comprae
  return Object.is(prevProps.product, nextProps.product)
})