'use client'

import React from 'react'
import { useCart } from '@/Context/CartContext'


const Cart = () => {
    const { cartProducts } = useCart();
    return (
        <div>
            <h2>Your Cart</h2>
            {cartProducts.map((product) => {
                return(
                <div key={product.id}>
                    <div className="prod_name">{product.name}</div>
                    <div className="qty">{product.qty}</div>
                </div>
                )
            })}
        </div>
    )
}

export default Cart
