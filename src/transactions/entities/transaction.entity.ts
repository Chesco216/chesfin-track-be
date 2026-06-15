import { User } from 'src/auth/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.transaction)
  user: User;

  @ManyToOne(() => Category, (category) => category.transaction)
  category: Category;
}
