import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Order } from './order.entity';

@Entity()
export class OrderProduct extends CommonEntity {
  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;
}
