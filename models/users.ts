// import mongoose, { models } from "mongoose";
// import { Schema } from "mongoose";

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true });


// const User = models.User || mongoose.model("User", userSchema)

// export default User









import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    cart: {
        productId: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        quantity: number;
    }[];
}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cart: [{
        productId: { type: Number, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, default: 1 },
    }],
});

const User = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;
