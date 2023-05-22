import { Body, Controller, Post, Get, Delete, Param, Patch, Put} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}
    
    @Put()
    async addOrder(
        @Body('orNumber') orNumber:string,
        @Body('date') orderDate: Date,
        @Body('customer') customerDetails: string,
        @Body('orderDetails') orderDetails: string){
            const generatedId = await this.ordersService.insertOrder(
                orNumber,
                orderDate,
                customerDetails,
                orderDetails,
            );
            return{id: generatedId};
        }
        @Get()
        async getAllOrder(){
            const orders = await this.ordersService.getOrders();
            return orders;
        }
        @Get(':id')
        getOrder(@Param('id') orderId: string,){
            return this.ordersService.getSingleOrder(orderId);
        }

        @Delete(':id')
        async removeOrder(@Param('id') orderId: string){
            await this.ordersService.deleteOrder(orderId);
            return null;
        }

        @Patch(':id')
        async updateOrder(
            @Param('id') orderId: string, 
            @Body('orNumber') orNumber: string, 
            @Body('date') date: Date, 
            @Body('customer') customer: any,
            @Body('orderDetails') orderDetails: any,
            ){
            await this.ordersService.updateOrder(orderId, orNumber, date, customer, orderDetails);
            return null;
        }
}
