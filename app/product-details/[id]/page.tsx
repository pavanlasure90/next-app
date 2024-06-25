"use client";
import React from "react";
import productsData from "../../../data.json";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/prodComponents/HeaderTop";
import HeaderMain from "@/app/prodComponents/HeaderMain";
import Footer from "@/app/prodComponents/Footer";
import { useSession } from "next-auth/react";
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
  const product = productsData.find(
    (each: Product) => each.id.toString() === id
  );

  const { data: session } = useSession<any>();
  console.log(session, "sessionn");
  const addToCart = async () => {
    if (!product) return;

    try {
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //@ts-ignore
          userId: session?.user?.email,
          productId: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added to cart:", result);
        router.push("/cart");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <div className="container pt-16">Product not found</div>;
  }

  return (
    <>
      <Navbar />
      <HeaderMain />
      <div className="container pt-16">
        <div className="border rounded-lg p-4 shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto mb-4 rounded-t-lg max-w-xs"
            />
            <h2 className="text-lg font-medium mb-2 text-center">
              {product.title}
            </h2>
            <p className="text-gray-600 mb-2 text-center">
              {product.description}
            </p>
            <p className="text-gray-800 font-bold mb-2 text-center">
              ${product.price}
            </p>
            <p className="text-gray-500 mb-4 text-center">
              Category: {product.category}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-500">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <button
              className="p-2 bg-blue-600 text-white border-gray-500 rounded"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
