import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  amount: number;

  @Column('text')
  type: string;

  @Column('text')
  description: string;

  @Column('date')
  date: Date;

  @Column('date')
  createdAt: Date;

  // user: User
  //
  // category: Category
  //
  // recurring: Recurring
}
