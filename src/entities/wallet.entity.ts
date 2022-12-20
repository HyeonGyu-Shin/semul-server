import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { User } from './users.entity';

@Entity()
export class Wallet extends CommonEntity {
  @Column()
  money: number;

  @Column()
  chargeMethod: string;

  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  static createEntityInstance(money = Number(0), chargeMethod = 'card') {
    const wallet = new Wallet();
    wallet.money = money;
    wallet.chargeMethod = chargeMethod;

    return wallet;
  }
}
