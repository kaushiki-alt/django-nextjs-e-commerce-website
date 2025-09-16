'use client'

import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  // When the component mounts on the client, this effect runs and sets hasMounted to true.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Once hasMounted is true, this effect loads the cart from localStorage.
  useEffect(() => {
    if (hasMounted) {
      try {
        const storedCart = window.localStorage.getItem('cart');
        if (storedCart) {
          setCartProducts(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage", error);
      }
    }
  }, [hasMounted]);

  // When cartProducts changes, this effect saves it to localStorage, but only if mounted.
  useEffect(() => {
    if (hasMounted) {
      try {
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
      } catch (error) {
        console.error("Error saving cart to localStorage", error);
      }
    }
  }, [cartProducts, hasMounted]);

  const addToCart = (product, qty = 1) => {
    setCartProducts((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: qty }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);