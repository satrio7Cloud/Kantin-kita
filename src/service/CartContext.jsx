import React, { createContext, useContext, useState } from "react";

// Membuat context baru
const CartContext = createContext();

// Membuat custom hook untuk menggunakan context
export const useCart = () => {
  return useContext(CartContext);
};

// Provider untuk menyediakan nilai ke context
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Fungsi untuk menambah produk ke keranjang
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      const newCartItem = { ...product, quantity };
      setCartItems([...cartItems, newCartItem]);
    }

    setCartCount((prevCount) => prevCount + quantity);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    const removedItem = cartItems.find((item) => item.id === itemId);

    if (removedItem) {
      setCartCount((prevCount) => prevCount - removedItem.quantity);
    }

    setCartItems(updatedCartItems);
  };

  // Nilai yang disediakan oleh provider
  const value = {
    cartCount,
    cartItems,
    addToCart,
    removeFromCart,
  };

  // Menyediakan nilai ke dalam context
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
