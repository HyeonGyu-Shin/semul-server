import { Address } from 'src/address/address.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Role } from 'src/common/enums/role.enum';
import { Laundry } from 'src/laundries/laundry.entity';
import { Order } from 'src/orders/order.entity';
import { Wallet } from 'src/wallets/wallet.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'enum', enum: Role })
  bizType: Role;

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn({ name: 'addressId', referencedColumnName: 'id' })
  address: Address;

  @OneToOne(() => Wallet, (wallet) => wallet.user)
  wallet: Wallet;

  @OneToOne(() => Laundry, (laundry) => laundry.user)
  laundry: Laundry;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  static createEntityInstance(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    bizType: Role,
  ) {
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.bizType = bizType;
    return user;
  }
}
