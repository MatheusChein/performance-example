import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: {
    id: number;
    price: number;
    title: string;
    formattedPrice: string;
  }[];
  totalPrice: number;
  onAddToWishList: (id: number) => void
}

export function SearchResults({ totalPrice, results, onAddToWishList }: SearchResultsProps) {

  return (
    <div>
      <h2>Total: {totalPrice}</h2>

      {results.map(item => (
        <ProductItem 
          key={item.id} 
          product={item}
          onAddToWishList={onAddToWishList}
        />
      ))}
    </div>
  )
}