import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction: Transaction[];

  @OneToMany(() => Category, (category) => category.user)
  category: Category[];
}
