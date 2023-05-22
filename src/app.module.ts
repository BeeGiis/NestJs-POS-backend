import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';

import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ProductsModule, CustomersModule, MongooseModule.forRoot('mongodb+srv://John:vzNzsGJVkCemJ2FC@cluster0.r4puvqr.mongodb.net/point-of-sale?retryWrites=true&w=majority'), OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
