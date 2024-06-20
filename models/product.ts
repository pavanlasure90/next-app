import mongoose, { Document } from 'mongoose';

export interface Product extends Document {
  id: number,
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
}

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true},
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const ProductModel = mongoose.models.Product || mongoose.model<Product>('Product', ProductSchema);

export default ProductModel;
