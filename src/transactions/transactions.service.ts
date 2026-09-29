import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    private readonly categoryService: CategoryService,
  ) { }

  async create(createTransactionDto: CreateTransactionDto, user: User) {
    try {
      const category = await this.categoryService.findOne(
        createTransactionDto.category,
      );
      if (!category)
        throw new BadRequestException(
          `category id ${createTransactionDto.category} not found`,
        );
      const newTransaction = this.transactionRepository.create({
        ...createTransactionDto,
        createdAt: new Date(),
        user,
        category,
      });

      await this.transactionRepository.save(newTransaction);

      const { user: u, ...transaction } = newTransaction;

      return transaction;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(id: string) {
    try {
      const queryBuilder =
        this.transactionRepository.createQueryBuilder('trans');
      const [transArr, total] = await queryBuilder
        .leftJoinAndSelect('trans.category', 'category')
        .where('trans.userId = :id', { id })
        .getManyAndCount();

      return {
        transactions: transArr,
        total,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAllWithPagination(id: string, limit: number, offset: number) {
    try {
      const queryBuilder =
        this.transactionRepository.createQueryBuilder('trans');
      const [transArr, total] = await queryBuilder
        .leftJoinAndSelect('trans.category', 'category')
        .where('trans.userId = :id', { id })
        .skip(offset)
        .take(limit)
        .getManyAndCount();

      return {
        transactions: transArr,
        total,
        offset,
        limit,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private handleDBErrors(error) {
    console.log({ error });
    throw new BadRequestException('pipipi');
  }
}
