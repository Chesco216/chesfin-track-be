import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const user = this.userRepository.create({
      ...userData,
      password: hashSync(password, 10),
    });
    await this.userRepository.save(user);

    return { user };
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true, password: true },
    });

    if (!user)
      throw new NotFoundException(`user with email ${email} not found`);

    if (!compareSync(password, user.password))
      throw new UnauthorizedException(`Password doesn't match for ${email}`);

    const token = this.generateJwtToken(user.id);
    return { email, token };
  }

  generateJwtToken(id: string) {
    return { id };
  }
}
