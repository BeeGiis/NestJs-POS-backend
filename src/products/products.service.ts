import { Injectable, NotFoundException} from "@nestjs/common";
import { Products } from "./products.model";

import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class ProductsService{
    // private products: Products[] = [];

    constructor(@InjectModel('Products') private readonly productModel: Model<Products>) {}

    async insertProduct(title: string, imageUrl: string, desc: string, price: number, quantity: number){
        const newProduct = new this.productModel({
            title,
            imageUrl,
            description: desc, 
            price,
            quantity,
        });
        const Prodresult = await newProduct.save();
        console.log(Prodresult);
        return Prodresult.id as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        // console.log(result);
        return products.map(prod => ({
            id: prod.id, 
            title: prod.title, 
            imageUrl: prod.imageUrl, 
            description: prod.description, 
            price: prod.price, quantity: 
            prod.quantity
        }));
    }
    async getSingleProduct(productId: string){
        const product = await this.findProduct(productId);
        return {
            id: product.id, 
            title: product.title, 
            imageUrl: product.imageUrl, 
            description: product.description, 
            price: product.price, 
            quantity: product.quantity,
        };
    }
    
    async updateProduct(productId: string, title: string, imageUrl: string, desc: string, price: number, quantity: number){
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (imageUrl) {
            updatedProduct.imageUrl = imageUrl;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        if (quantity) {
            updatedProduct.quantity = quantity;
        }

        updatedProduct.save();
    }

    private async findProduct(id: string): Promise<Products>{
        let product;
        try {
            product = await this.productModel.findById(id);
        } 
        catch(error){
            throw new NotFoundException('Could not find product');
        }
        
        if (!product){
            throw new NotFoundException('Could not find product');
        }
        return product;
    }
    
    async deleteProduct(prodId: string){
        await this.productModel.deleteOne({_id: prodId}).exec();
    }
}