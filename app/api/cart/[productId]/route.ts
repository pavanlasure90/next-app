import { authOptions } from "@/lib/Authoptions";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { productId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = params;
  const userId = session.user.email;

  try {
    await connectMongoDB();

    const user = await User.findOne({ email: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.cart = user.cart.filter(item => item.productId !== parseInt(productId, 10));
    user.markModified('cart');
    await user.save();

    return NextResponse.json({ message: 'Product removed from cart' }, { status: 200 });
  } catch (error) {
    console.error('Error removing product from cart:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
