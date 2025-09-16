'use client'

import React, { useEffect, useState } from 'react'
import { getProduct } from '@/utils/publicApi'
import { useParams } from 'next/navigation'
import useRequestState from '@/hooks/useRequestState'
import { useCart } from '@/Context/CartContext'


const ProductPage = () => {
  const {run, success, error, loading} = useRequestState();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      run(async () => {
        const productData = await getProduct(params.id);
        setProduct(productData);
      });
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      console.log('added to the cart');
      
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found.</p>;
  

  return (
    <>
      <div>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />

        <p>{product.description}</p>
        <p>₹{product.price}</p>
        <p>Stock: {product.stock}</p>
      </div> 
      <div className='mt-3'>
        <button type="button" className='p-2 bg-accent rounded-md' onClick={handleAddToCart}>Add to cart</button>
      </div>
    </>
  )
}

export default ProductPage
