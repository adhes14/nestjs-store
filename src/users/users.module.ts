import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';
import { ProductsModule } from '../products/products.module';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [CustomersController, UsersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
