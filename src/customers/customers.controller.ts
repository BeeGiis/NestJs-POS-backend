import { Controller, Post, Body, Get, Param, Patch, Delete, Put} from "@nestjs/common/decorators";
import { CustomersService } from "./customers.service";
import { Customers } from "./customers.model";

@Controller('customers')
export class CustomersController{
    constructor(private readonly customersService: CustomersService){}
    @Post()
    async addCustomer(
        @Body('name') custName: string, 
        @Body('companyName') custComp: string, 
        @Body('contactName') custContName: string,
        @Body('address') custAddress: string,
        @Body('city') custCity: string,
        @Body('region') custReg: string,
        @Body('postalCode') custPost: string,
        @Body('country') custCountry: string,
        @Body('phone') custPhone: string) {
            const generatedId = await this.customersService.insertCustomer(
                custName,
                custComp,
                custContName,
                custAddress,
                custCity,
                custReg,
                custPost,
                custCountry,
                custPhone
            );
            return{id: generatedId};
        }
        
        @Get()
        async getAllCustomers(){
            const customers = await this.customersService.getCustomers();
            return customers;
        }
        
        @Get(':id')
        getCustomer(@Param('id') custId: string,){
            return this.customersService.getSingleCustomer(custId);
        }
        
        @Patch(':id')
        async updateProduct(
            @Param('id') custId: string, 
            @Body('name') custName: string, 
            @Body('companyName') custComp: string, 
            @Body('contactName') custContName: string,
            @Body('address') custAddress: string,
            @Body('city') custCity: string,
            @Body('region') custReg: string,
            @Body('postalCode') custPost: string,
            @Body('country') custCountry: string,
            @Body('phone') custPhone: string
            ){
            await this.customersService.updateCustomer(custId,  custName,
                custComp, custContName, custAddress, custCity, custReg, custPost, custCountry, custPhone);
            return null;
        }
        @Delete(':id')
        async removeCustomer( @Param('id') custId: string,){
            await this.customersService.deleteCustomer(custId);
            return null;
        }
        
        // @Put(':id')
        // async putUpdate(
        //     @Param('id') custId: string, 
        //     @Body('name') custName: string, 
        //     @Body('companyName') custComp: string, 
        //     @Body('contactName') custContName: string,
        //     @Body('address') custAddress: string,
        //     @Body('city') custCity: string,
        //     @Body('region') custReg: string,
        //     @Body('postalCode') custPost: string,
        //     @Body('country') custCountry: string,
        //     @Body('phone') custPhone: string
        // ){
        //     await this.customersService.putUpdate
        // }
        
    }