import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

export interface Products extends mongoose.Document {

    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    quantity: number;
   
}