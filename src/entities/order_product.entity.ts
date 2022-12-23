import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class OrderProduct extends CommonEntity {
  @Column()
  productName: string;

  @Column()
  price: number;

  @Column()
  qty: number;

  @Column()
  orderId: string;
}
