// "use client";
// import React from "react";
// import productsData from "../../../data.json"; 
// import { useParams } from "next/navigation";

// interface Rating {
//   rate: number;
//   count: number;
// }

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: Rating;
// }

// const Page = () => {
//   const { id } = useParams();
//   console.log(id);
//   let product = productsData.find((each: any) => each.id == id);

//   return (
//     <div className="container pt-16">
//       <h2 className="font-medium text-2xl">{product?.title}</h2>
//       <div className="flex justify-between items-center mt-4">
//         <div className="w-1/2">
//           <img
//             src={product?.image}
//             alt={product?.title}
//             className="w-full rounded-lg"
//           />
//         </div>
//         <div className="w-1/2 px-4">
//           <p className="text-gray-600 mb-4">{product?.description}</p>
//           <p className="text-gray-800 font-bold">${product?.price}</p>
//           <button className="p-2 bg-blue-600 text-white border-gray-500 rounded">Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;













"use client";
import React from "react";
import productsData from "../../../data.json";
import { useParams, useRouter } from "next/navigation";

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

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const product = productsData.find((each: any) => each.id == id);

  const addToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product?.id,
          title: product?.title,
          price: product?.price,
          description: product?.description,
          category: product?.category,
          image: product?.image,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product added to cart:', result);
        router.push('/cart'); 
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="container pt-16">
      <h2 className="font-medium text-2xl">{product?.title}</h2>
      <div className="flex justify-between items-center mt-4">
        <div className="w-1/2">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-1/2 px-4">
          <p className="text-gray-600 mb-4">{product?.description}</p>
          <p className="text-gray-800 font-bold">${product?.price}</p>
          <button
            className="p-2 bg-blue-600 text-white border-gray-500 rounded"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
