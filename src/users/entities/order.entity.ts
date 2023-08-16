import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Expose()
  get products() {
    if (this.orderItems) {
      return this.orderItems
        .filter((item) => !!item)
        .map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.orderItems) {
      return this.orderItems
        .filter((item) => !!item)
        .reduce((total, item) => {
          const costItem = item.product.price * item.quantity;
          return total + costItem;
        }, 0);
    }
    return 0;
  }
}
