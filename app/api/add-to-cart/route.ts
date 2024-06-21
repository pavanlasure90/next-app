// // post and get calls



// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
// import CartModel from '@/models/Cart';
// import ProductModel from '@/models/Product';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';
// import { connectMongoDB } from '@/lib/mongodb';

// export async function POST(req: Request) {
//   const session: any = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
//   }

//   try {
//     const { productId, count, color, attribute, image, title } = await req.json();
//     const userId = session.user.id;

//     await connectMongoDB();

//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     let cart = await CartModel.findOne({ orderBy: userId });
//     if (!cart) {
//       cart = await CartModel.create({ orderBy: userId });
//       user.cart.push(cart._id);
//       await user.save();
//     }

//     const existingItem = cart.products.find(
//       (item: any) => item._id.toString() === productId && item.color === color && JSON.stringify(item.attribute.specs) === JSON.stringify(attribute.specs)
//     );

//     if (existingItem) {
//       existingItem.count += count;
//     } else {
//       cart.products.push({ _id: productId, count, color, attribute, image, title });
//     }

//     await cart.save();

//     const total = cart.products.reduce((acc: any, item: any) => {
//       const itemPrice = typeof item.attribute.price === 'number' ? item.attribute.price : parseInt(item.attribute.price, 10) || 0;
//       return acc + item.count * itemPrice;
//     }, 0);

//     cart.total = total;
//     cart.cartTotal = total + cart.deliveryCharge + cart.handlingCharge + cart.tip;
//     cart.totalAfterDiscount = cart.cartTotal;
//     await cart.save();

//     return NextResponse.json({ cart });
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }


// /pages/api/add-to-cart.ts





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
  console.log(userId)

  try {
    await connectMongoDB();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingProductIndex = user.cart.findIndex(item => item.productId === productId);

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
        quantity: 1,
      });
    }

    await user.save();
    res.status(201).json({ message: 'Product added to cart', user });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
