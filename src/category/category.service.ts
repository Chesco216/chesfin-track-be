import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto, user: User) {
    try {
      const newCategory = this.categoryRepository.create({
        ...createCategoryDto,
        craetedAt: new Date(),
        user,
      });

      await this.categoryRepository.save(newCategory);
      return {
        id: newCategory.id,
        name: newCategory.name,
        icon: newCategory.icon,
        color: newCategory.color,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
    return 'This action adds a new category';
  }

  async findAll(id: string) {
    try {
      const queryBuilder = this.categoryRepository.createQueryBuilder('cat');
      const categories = await queryBuilder
        .where('cat.user = :id', { id })
        .getMany();
      return categories;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findOne(id: string) {
    try {
      const category = this.categoryRepository.findOneBy({ id });
      return category;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  private handleDBErrors(error) {
    console.log({ error });
    throw new BadRequestException('cannot find category/ies');
  }
}
