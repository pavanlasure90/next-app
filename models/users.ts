import mongoose, { Schema, Document, models } from "mongoose";

interface CartItem {
    productId: number; // Ensure this matches your product ID type
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    cart: CartItem[];
}

const cartItemSchema = new Schema<CartItem>({
    productId: { type: Number, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, default: 1 },
});

const userSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cart: [cartItemSchema],
    },
    { timestamps: true }
);

const User = models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
