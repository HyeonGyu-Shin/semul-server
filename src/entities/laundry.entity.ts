import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Address } from './address.entity';
import { CommonEntity } from './common.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { User } from './users.entity';

@Entity()
export class Laundry extends CommonEntity {
  @Column()
  name: string;

  @Column()
  bizNo: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.laundry)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @OneToOne(() => Address, (address) => address.laundry)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Review, (review) => review.laundry)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.laundry)
  order: Order[];

  static createEntityInstance(
    name: string,
    phoneNumber: string,
    bizNo: string,
  ) {
    const laundry = new Laundry();
    laundry.name = name;
    laundry.phoneNumber = phoneNumber;
    laundry.bizNo = bizNo;
    return laundry;
  }
}
