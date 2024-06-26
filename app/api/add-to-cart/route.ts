import { authOptions } from "@/lib/Authoptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { userId, productId, title, price, description, category, image } = body;

  try {
    await connectMongoDB();

    const user = await User.findOne({ email: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

    user.markModified('cart');
    await user.save();

    return NextResponse.json({ message: 'Product added to cart', user }, { status: 201 });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
