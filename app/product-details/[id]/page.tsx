"use client"
import React from 'react';
import { GetServerSideProps } from 'next';
import productsData from '../../../data.json'; // Example data source; adjust as per your project structure
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
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
    <div className="container pt-16">
      <h2 className="font-medium text-2xl">{product?.title}</h2>
      <div className="flex justify-between items-center mt-4">
        <div className="w-1/2">
          <img src={product?.image} alt={product?.title} className="w-full rounded-lg" />
        </div>
        <div className="w-1/2 px-4">
          <p className="text-gray-600 mb-4">{product?.description}</p>
          <p className="text-gray-800 font-bold">${product?.price}</p>
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const productId = params?.id as string;
//   const id = parseInt(productId, 10); // Convert id to number

//   // Simulating fetching product from data source based on id
//   const product = productsData.find((product) => product.id === id);

//   if (!product) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export default ProductDetails;
