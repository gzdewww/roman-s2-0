import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      updateCart(id, cart.find((item) => item.id === id).quantity + 1);
      return;
    }
    setCart((prevCart) => [...prevCart, { id: id, quantity: 1 }]);
  };

  const removeFromCart = (id) => {
    if (!cart.find((item) => item.id === id)) return;
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCart = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, addToCart, removeFromCart, updateCart, clearCart };
};
