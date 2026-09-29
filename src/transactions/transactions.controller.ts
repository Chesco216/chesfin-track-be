import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetUser } from 'src/auth/decorators/get-user/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ParseTransactionQueryPipe } from './pipes/transaction-query-validation.pipe';
import { type ValidTransactionQueries } from './interfaces/ValidTransactionQueries';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.create(createTransactionDto, user);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
    const { id } = user;
    return this.transactionsService.findAll(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAllWithPagination(
    @GetUser() user: User,
    @Query(ParseTransactionQueryPipe) query: ValidTransactionQueries,
  ) {
    const { id } = user;
    console.log(query);
    return this.transactionsService.findAllWithPagination(
      id,
      +query['limit'],
      +query['offset'],
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
