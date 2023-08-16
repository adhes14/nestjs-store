import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  findAll() {
    return this.orderItemRepo.find({
      relations: ['product', 'order'],
    });
  }

  async findOne(id: number) {
    const orderitem = await this.orderItemRepo.findOne(id, {
      relations: ['product', 'order'],
    });
    if (!orderitem) throw new NotFoundException(`Order Item #${id} not found`);
    return orderitem;
  }

  async create(payload: CreateOrderItemDto) {
    const newOrderItem = this.orderItemRepo.create(payload);
    const product = await this.productRepo.findOne(payload.productId);
    const order = await this.orderRepo.findOne(payload.orderId);
    newOrderItem.product = product;
    newOrderItem.order = order;
    return this.orderItemRepo.save(newOrderItem);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.findOne(id);
    if (!changes.productId) {
      const product = await this.productRepo.findOne(changes.productId);
      orderItem.product = product;
    }
    if (!changes.orderId) {
      const order = await this.orderRepo.findOne(id);
      orderItem.order = order;
    }
    return this.orderItemRepo.save(orderItem);
  }

  remove(id: number) {
    return this.orderItemRepo.delete(id);
  }
}
