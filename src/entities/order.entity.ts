import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  pickUpMethod: string;

  @Column()
  status: string;

  @Column()
  notice: string;

  @Column({ nullable: true })
  deniedReason: string;

  @Column()
  pickUpDateTime: Date;

  @Column({ nullable: true })
  wishLaundryDateTime: Date;

  @Column('simple-array')
  products: string[];

  @Column({ nullable: true })
  completedDateTime: Date;

  @CreateDateColumn()
  createdDateTime: Date;

  @UpdateDateColumn()
  updatedDateTime: Date;

  @DeleteDateColumn()
  deletedDateTime: Date;
}
