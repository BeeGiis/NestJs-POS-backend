import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
       name: { type: String, required: true },
       companyName: { type: String, required: true },
       contactName: { type: String, required: true },
       address: { type: String, required: true },
       city: { type: String, required: true },
       region: { type: String, required: true },
       postalCode: { type: String, required: true },
       country: { type: String, required: true },
       phone: { type: String, required: true },
});
export interface Customers extends mongoose.Document {

       id: string;
       name: string;
       companyName: string;
       contactName: string;
       address: string;
       city: string;
       region: string;
       postalCode: string;
       country: string;
       phone: string;
}