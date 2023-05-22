import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './customers.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Customers', schema: CustomerSchema}])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
