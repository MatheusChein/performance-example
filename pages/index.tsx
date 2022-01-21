import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults';

interface Results {
  data: any[];
  totalPrice: number;
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0
  });
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    
    if (!search.trim()) {
      return
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);

    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((acc, current) => {
      return acc + current.price
    }, 0)

    setResults({
      data: products,
      totalPrice
    })
  }

  const addToWishList = useCallback((id: number) => {
    console.log(id);
  }, [])
  
  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type='submit'>Buscar</button>
      </form>

      <SearchResults results={results.data} totalPrice={results.totalPrice} onAddToWishList={addToWishList}/>
   </div>
  )
}
