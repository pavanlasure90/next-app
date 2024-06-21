"use client";
import React, { useEffect, useState } from 'react';

interface CartItem {
  productId: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart/');
        const result = await response.json();
        setCartItems(result.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container pt-16">
      <h2 className="font-medium text-2xl">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.productId} className="flex justify-between items-center mt-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-1/6 rounded-lg"
              />
              <div className="w-1/2 px-4">
                <h3 className="text-gray-800 font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
