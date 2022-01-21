import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: {
    id: number;
    price: number;
    title: string;
  }[];
  onAddToWishList: (id: number) => void
}

export function SearchResults({ results, onAddToWishList }: SearchResultsProps) {
  const totalPrice = useMemo(() => {
    return results.reduce((acc, current) => {
      return acc + current.price
    }, 0)
  }, [results])

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