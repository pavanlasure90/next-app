"use client"
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import productsData from '../../data.json';
import { useRouter } from 'next/navigation'; 

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter(); 
  // const { id } = router.query as { id: string }; // Assuming `id` is a string

  useEffect(() => {
    setProducts(productsData); 
  }, []);

  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="container pt-16">
        <h2 className="font-medium text-2xl pb-4">New Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-lg">
              <img
                style={{ height: '200px', width: '200px' }}
                src={product.image}
                alt={product.title}
                className="w-full h-auto mb-4 rounded-t-lg"
              />
              <h2 className="text-lg font-medium mb-2">{product.title}</h2>
              <div className="mb-4">{renderStars(product.rating.rate)}</div>
              <div className="font-bold flex gap-4 pb-2">
                ${product.price}
                <del className="text-gray-500 font-normal">
                  ${parseInt(product.price) + 50}.00
                </del>
              </div>
              <Link href={`/product-details/${product.id}`}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  View Product
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
