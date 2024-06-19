"use client"
import React, { useEffect, useState } from 'react';
import productsData from '../../data.json';
import Navbar from '@/components/Navbar';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <>
        <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product:any) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-lg">
          <img src={product.image} alt={product.title} className="w-full h-auto mb-4 rounded-t-lg" />
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2">${product.price}</p>
          <p className="text-sm text-gray-500 mb-4">{product.description}</p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            View Product
          </button>
        </div>
      ))}9
    </div>
    </>
  );
};

export default Home;
