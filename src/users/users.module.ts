import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [CustomersController, UsersController],
})
export class UsersModule {}
