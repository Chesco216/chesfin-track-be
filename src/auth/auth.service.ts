import {
  BadRequestException,
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
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...userData,
        password: hashSync(password, 10),
      });
      await this.userRepository.save(user);

      const token = this.generateJwtToken({ id: user.id });
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };
    } catch (error) {
      this.handleDbExeptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true, password: true, name: true },
    });

    if (!user)
      throw new NotFoundException(`user with email ${email} not found`);

    if (!compareSync(password, user.password))
      throw new UnauthorizedException(`Password doesn't match for ${email}`);

    const token = this.generateJwtToken({ id: user.id });
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }

  refreshToken(user: User) {
    const newToken = this.generateJwtToken({ id: user.id });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      newToken,
    };
  }

  private generateJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDbExeptions(error: any) {
    if (error.code == 23505) throw new BadRequestException(error.detail);
  }
}
