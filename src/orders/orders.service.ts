import { Injectable, NotFoundException} from '@nestjs/common';
import { Orders } from './orders.model';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

    constructor(@InjectModel('Orders') private readonly orderModel: Model<Orders>){}

    async insertOrder(orNumber: string, orderDate: Date, customerDetails: string, orderDetails: string){
        const newOrder = new this.orderModel({
            orNumber,
            date: orderDate,
            customer: customerDetails,
            orderDetails

        });
        const orderResult = await newOrder.save();
        console.log(orderResult);
        return orderResult.id as string;
    }

    async getOrders(){
        // return this.orderModel.find().exec();
          const orders = await this.orderModel.find().exec();
            console.log(orders);
          return orders.map(ord => ({
              id: ord.id, 
              orNumber: ord.orNumber,
              date: ord.date,
              customer: ord.customer,
              orderDetails: ord.orderDetails
          }));
    }
    async getSingleOrder(orderId: string){
        const order = await this.findOrder(orderId);
        return {
            id: order.id, 
            orNumber: order.orNumber,
            date: order.date,
            customer: order.customer,
            orderDetails: order.orderDetails
        };
    }

    async updateOrder(orderId: string, orNumber: string, date: Date, customer, orderDetails){
        const updatedOrder = await this.findOrder(orderId);
        if (orNumber) {
            updatedOrder.orNumber = orNumber;
        }
        if (date) {
            updatedOrder.date = date;
        }
        if (customer) {
            updatedOrder.customer = customer;
        }
        if (orderDetails) {
            updatedOrder.orderDetails = orderDetails;
        }

        updatedOrder.save();
    }

    async deleteOrder(orderId: string){
        await this.orderModel.deleteOne({_id: orderId}).exec();
    }

    private async findOrder(id: string): Promise<Orders>{
        let order;
        try {
            order = await this.orderModel.findById(id);
        } 
        catch(error){
            throw new NotFoundException('Could not find order');
        }
        
        if (!order){
            throw new NotFoundException('Could not find order');
        }
        return order;
    }
}
