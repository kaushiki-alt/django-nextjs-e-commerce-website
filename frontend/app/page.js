'use client'

import React, { useState, useEffect } from 'react'
import { getProducts } from '@/utils/publicApi'
import Product from '@/components/Product'
import useRequestState from '@/hooks/useRequestState'
import Link from 'next/link'

const Home = () => {
  const { run, loading, error } = useRequestState()
  const [products, setProducts] = useState([])

  useEffect(() => {
    run(async () => {
      const res = await getProducts();
      setProducts(res);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main>
      <div className='products grid grid-cols-4 gap-5'>
        {products && products.map((product) => {
          return (
            <section className='bg-bg-tertiary p-2 rounded-sm' key={product.id}>
              <Link href={`products/${product.id}`}>
              <Product {...product} />
              </Link>
            </section>
          )
        })}
      </div>
    </main>
  )
}

export default Home

// data detail page
// and focus on Ui