import * as mongoose from 'mongoose';

export type OrderDocument = Orders;

export const OrdersSchema = new mongoose.Schema({
    orNumber: String,
    date: {type: Date, default: Date.now},
    customer: [],
    orderDetails: [
        // {
        //     identifier: {type: String},
        //     barCode: {type: String},
        //     skuNumber: {type: Number},
	    //     skuDescription: {type: String},
	    //     amount: {type: Number},
	    //     totalTaxAmount: {type: Number},
	    //     discount: {type: String},
	    //     discountAmount: {type: Number},
	    //     quantity: {type: Number},
	    //     itemTotal: {type: Number},
	    //     deleteInd: {type: Boolean},
        // }
    ],
    
});

export interface Orders extends mongoose.Document{

    orNumber: string;
    date: Date;
    customer: [
        {
            fullname: string,
            companyName: string,
            tinNumber: string,
            address: string,
            phone: string
        }
    ],
    orderDetails: [
        {
            identifier: string,
            barCode: string,
            skuNumber: number,
	        skuDescription: string,
	        amount: number,
	        totalTaxAmount: number,
	        discount: number,
	        discountAmount: number,
	        quantity: number,
	        itemTotal: number,
	        deleteInd: boolean,
            
        }
    ],
}