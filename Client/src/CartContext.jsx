import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {


  const url = "https://ourkart-production.up.railway.app"; // Your backend URL


  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Clear token from localStorage
  };

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("token", localStorage.getItem("token") || "");
    }
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    const itemId = product._id || product.id;

    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...product,
        quantity: (prev[itemId]?.quantity || 0) + 1,
      },
    }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: product._id || product.id },
          { headers: { token } }
          // { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

const removeFromCart = async (product) => {
  const itemId = product._id || product.id;

  setCartItems((prev) => {
    const updatedCart = { ...prev };

    if (updatedCart[itemId]) {
      if (updatedCart[itemId].quantity > 1) {
        updatedCart[itemId] = {
          ...updatedCart[itemId],
          quantity: updatedCart[itemId].quantity - 1,
        };
      } else {
        delete updatedCart[itemId];
      }
    }

    return updatedCart;
  });

  if (token) {
    try {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  }
};


  // // Load cart data from the backend
  // const loadCartData = async () => {
  //   if (token) {
  //     try {
  //       const response = await axios.post(
  //         `${url}/api/cart/get`,
  //         {},
  //         { headers: { token } }
  //       );
  //       setCartItems(response.data.cartData);
  //     } catch (error) {
  //       console.error("Error loading cart data:", error);
  //     }
  //   }
  // };


  //   // Reload cart data on token change
  // useEffect(() => {
  //   loadCartData();
  // }, [token]);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isLoggedIn, setIsLoggedIn, handleLogout, token,setToken}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
