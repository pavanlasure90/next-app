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
  // const userId = session?.user.id
  console.log(userId, "user")

  try {
    await connectMongoDB();

    const user = await User.find({ email: userId });
    console.log(user)

    const existingProductIndex = user[0].cart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
      user[0].cart[existingProductIndex].quantity++;
    } else {
      user[0].cart.push({
        productId,
        title,
        price,
        description,
        category,
        image,
        quantity: 1,
      });
    }

    await user[0].save();
    
    return NextResponse.json({ message: 'Product added to cart', user }, { status: 201 });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
