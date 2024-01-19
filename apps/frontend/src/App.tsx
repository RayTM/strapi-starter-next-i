import { useEffect, useRef, useState } from 'react'
import './App.css'
import { fetchData } from './lib/fetch'
import Product from './components/Product';

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [fetchError, setFetchError] = useState<boolean>(false)

  const myInputField = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    console.log(myInputField?.current?.value)
  }

  const fetchProducts = async () => {
    try {
      const products: Product[] = await fetchData<Product[]>('https://659d60d0633f9aee79094b63.mockapi.io/products');
      setProducts(products)
    } catch (error) {
      setFetchError(true)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  if (fetchError) {
    return <>Error</>
  }

  return (
    <div className="container mx-auto">
      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10'>
        { products.map((product, index) => <Product {...product} key={index} />) }
      </div>
      <div className='flex gap-6'>
        <input
          ref={myInputField}
          className='px-6 py-4 rounded-md border border-slate-300'
          type="text"
        />
        <button
          onClick={clickHandler}
          className='px-6 py-4 rounded-md bg-indigo-800 text-white hover:bg-indigo-900'
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App;
