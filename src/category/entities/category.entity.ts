import { User } from 'src/auth/entities/user.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  icon: number;

  @Column('int')
  color: number;

  @Column('text')
  craetedAt: Date;

  @ManyToOne(() => User, (user) => user.category)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transaction: Transaction[];
}
