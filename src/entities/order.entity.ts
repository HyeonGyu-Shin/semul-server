import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Laundry } from './laundry.entity';
import { OrderProduct } from './order_product.entity';
import { Review } from './review.entity';
import { User } from './users.entity';

@Entity()
export class Order extends CommonEntity {
  @Column()
  status: string;

  @Column()
  pickUpMethod: string;

  @Column()
  pickUpDateTime: Date;

  @Column('simple-json')
  address: { roadAddr: string; detailAddr: string; jibun: string };

  @Column({ nullable: true })
  wishLaundryDateTime: Date;

  @Column({ nullable: true })
  notice: string;

  @Column({ nullable: true })
  deniedReason: string;

  @Column({ nullable: true })
  completedDateTime: Date;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Laundry, (laundry) => laundry.order)
  laundry: Laundry;

  @OneToOne(() => Review, (review) => review.order)
  review: Review;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  orderProducts: OrderProduct[];
}
