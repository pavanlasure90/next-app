// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import CartModel from '@/models/Cart';
// import { connectMongoDB } from '@/lib/mongodb';

// export async function POST(req: Request) {
//   try {
//     const { productId, title, price, description, category, image } = await req.json();

//     await connectMongoDB();

//     const cartItem = new CartModel({
//       productId,
//       title,
//       price,
//       description,
//       category,
//       image,
//     });

//     const savedCartItem = await cartItem.save();

//     return NextResponse.json(savedCartItem, { status: 201 });
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }





import { getSession } from 'next-auth/react';
import User from '@/models/users';
import { connectMongoDB } from '@/lib/mongodb';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { productId, title, price, description, category, image } = req.body;
  const userId = session.user.id;

  try {
    await connectMongoDB();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingProductIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity++;
    } else {
      user.cart.push({
        productId,
        title,
        price,
        description,
        category,
        image,
        quantity: 1 
      });
    }

    await user.save();
    res.status(201).json({ message: 'Product added to cart', user });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
