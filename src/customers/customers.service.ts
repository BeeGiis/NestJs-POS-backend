import { Injectable, NotFoundException} from "@nestjs/common";
import { Customers } from "./customers.model";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CustomersService{
    // private customers: Customers[] = [];

    constructor(@InjectModel('Customers') private readonly customerModel: Model<Customers>){}

    async insertCustomer(
        custName: string, 
        custComp: string, 
        custContName: string, 
        custAddress: string, 
        custCity: string, 
        custReg: string, 
        custPost: string, 
        custCountry: string, 
        custPhone: string
    ){
        const newCustomer = new this.customerModel({
            name: custName,
            companyName: custComp,
            contactName: custContName,
            address: custAddress,
            city: custCity,
            region: custReg,
            postalCode: custPost,
            country: custCountry,
            phone: custPhone,
        });
        const CustomerResult = await newCustomer.save();
        console.log(CustomerResult);
        return CustomerResult.id as string;
    }

    async getCustomers(){
        const customers = await this.customerModel.find().exec();
        return customers.map(cust =>( {
            id: cust.id,
            name: cust.name,
            companyName: cust.companyName,
            contactName: cust.contactName,
            address: cust.address,
            city: cust.city,
            region: cust.region,
            postalCode: cust.postalCode,
            country: cust.country,
            phone: cust.phone,
        }));
    }
    async getSingleCustomer(customerId: string){
        const customer = await this.findCustomer(customerId);
        return {
            id: customer.id,
            name: customer.name,
            companyName: customer.companyName,
            contactName: customer.contactName,
            address: customer.address,
            city: customer.city,
            region: customer.region,
            postalCode: customer.postalCode,
            country: customer.country,
            phone: customer.phone,
        };
    }
    
    async updateCustomer(
        customerId: string,
        custName: string, 
        custComp: string, 
        custContName: string, 
        custAddress: string, 
        custCity: string, 
        custReg: string, 
        custPost: string, 
        custCountry: string, 
        custPhone: string,
        ){
        
        const updatedCustomer = await this.findCustomer(customerId);
        if (custName) {
            updatedCustomer.name = custName;
        }
        if (custComp) {
            updatedCustomer.companyName = custComp;
        }
        if (custContName) {
            updatedCustomer.contactName = custContName;
        }
        if (custAddress) {
            updatedCustomer.address = custAddress;
        }
        if (custCity) {
            updatedCustomer.city = custCity;
        }
        if (custReg) {
            updatedCustomer.region = custReg;
        }
        if (custPost) {
            updatedCustomer.postalCode = custPost;
        }
        if (custCountry) {
            updatedCustomer.country = custCountry;
        }
        if (custPhone) {
            updatedCustomer.phone = custPhone;
        }

        updatedCustomer.save();
    }
    // async update(id: string) {
    //     const post = await this.postModel
    //       .findByIdAndUpdate(id, postData)
    //       .setOptions({ overwrite: true, new: true })
    //       .populate('author')
    //       .populate('categories')
    //       .populate('series');
    //     if (!post) {
    //       throw new NotFoundException();
    //     }
    //     return post;
    //   }

    private async findCustomer(id: string): Promise <Customers> {
        let customer;
        try{
            customer = await this.customerModel.findById(id);
        }
        catch(error){
            throw new NotFoundException('Could not find customer');
        }
        if (!customer){
            throw new NotFoundException('Could not find customer');
        }
        return customer;
    }
    async deleteCustomer(custId: string){
        await this.customerModel.deleteOne({_id: custId}).exec();
    }
}