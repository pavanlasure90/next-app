"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../prodComponents/HeaderTop';

interface CartItem {
  productId: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number; // Add quantity property to CartItem interface
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const result = await response.json();
        setCartItems(result.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (productId: number) => {
    try {
      const response = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Calculate total quantity and total price based on individual item quantities and prices
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price), 0);

  return (
    <div>
      <Navbar />
      <div className="container pt-16">
        <h1 className="font-medium text-2xl mb-4">Your Cart</h1>
       
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex flex-col md:flex-row items-center p-4 border rounded-lg shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0"
                />
                <div className="flex-1 px-4">
                  <h3 className="text-gray-800 font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-gray-800 font-bold">Price: ${item.price}</p>
                  <p className="text-gray-800">Quantity: {item.quantity}</p>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 mb-2 md:mb-0 md:mr-2"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
         <div className="cart-summary mb-4 font-bold" style={{ textAlign: 'right' }}>
          <p>Total Quantity:  {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
