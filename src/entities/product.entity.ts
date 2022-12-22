import { Entity, Column } from 'typeorm';
import { CommonEntity } from './common.entity';

@Entity()
export class Product extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
