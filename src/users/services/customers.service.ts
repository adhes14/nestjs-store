import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { UsersService } from './users.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private usersService: UsersService,
  ) {}

  findAll() {
    return this.customerRepo.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) throw new NotFoundException(`Customer #${id} not found`);
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    if (data.userId) {
      const user = await this.usersService.findOne(data.userId);
      newCustomer.user = user;
    }
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const custumer = await this.findOne(id);
    this.customerRepo.merge(custumer, changes);
    return this.customerRepo.save(custumer);
  }

  remove(id: number) {
    return this.customerRepo.delete(id);
  }
}
