import { Address } from 'src/address/address.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Review } from 'src/common/review.entity';
import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

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
