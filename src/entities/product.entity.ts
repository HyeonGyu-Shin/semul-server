import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @CreateDateColumn()
  createdDateTime: Date;

  @UpdateDateColumn()
  updatedDateTime: Date;

  @DeleteDateColumn()
  deletedDateTime: Date;
}
