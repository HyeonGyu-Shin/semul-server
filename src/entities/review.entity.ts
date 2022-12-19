import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Laundry } from './laundry.entity';

@Entity()
export class Review extends CommonEntity {
  @Column({ type: 'float' })
  rate: number;

  @Column({ type: 'text' })
  reviewText: string;

  @ManyToOne(() => Laundry, (laundry) => laundry.reviews)
  laundry: Laundry;
}
