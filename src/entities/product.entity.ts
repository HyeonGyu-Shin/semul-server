import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Product extends CommonEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
