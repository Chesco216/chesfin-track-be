import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetUser } from 'src/auth/decorators/get-user/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
    const { id } = user;
    return this.transactionsService.findAll(id);
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
