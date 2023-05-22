import { Module } from "@nestjs/common/decorators";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";


import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./products.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Products', schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule{}