import { Module } from '@nestjs/common';
import { isMapIterator } from 'util/types';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

import { MongooseModule } from "@nestjs/mongoose";
import { OrdersSchema } from "./orders.model";

@Module({

    imports: [MongooseModule.forFeature([{name: 'Orders', schema: OrdersSchema}])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}
