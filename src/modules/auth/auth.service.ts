import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { Excluder } from 'src/helper/exluder.helper';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(
    createDto: AuthRegisterLoginDto,
  ): Promise<Omit<User, 'hashPassword' | 'hashToken'>> {
    const checkUser = await this.prisma.user.findFirst({
      where: { email: createDto.email },
    });

    if (checkUser) {
      console.log(checkUser);
      throw new HttpException('message', HttpStatus.BAD_REQUEST, {
        cause: new Error('User already exists'),
      });
    }

    const hashedPassword = await bcrypt.hash(createDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: createDto.firstName,
        lastName: createDto.lastName,
        email: createDto.email,
        hashPassword: hashedPassword,
        hashToken: '',
      },
    });
    const clientClean = Excluder(user, ['hashPassword', 'hashToken']);
    return clientClean;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
