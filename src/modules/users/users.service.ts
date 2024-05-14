import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    let user = await this.findOne(createUserDto.nickname);
    if (user) {
      return {
        err: 1,
        msg: '用户名已经被注册了',
        data: null,
      };
    }

    user = {
      id: randomUUID(),
      ...createUserDto,
    };
    this.users.push(user);

    return {
      err: 0,
      msg: '注册成功！',
      data: {
        id: user.id,
        nickname: user.nickname,
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findOne(loginUserDto.nickname);
    if (!user) {
      return {
        err: 1,
        msg: '没有此用户！',
        data: null,
      };
    }
    if (loginUserDto.password != user.password) {
      return {
        err: 1,
        msg: '密码错误！',
        data: null,
      };
    }

    return {
      err: 0,
      msg: '登录成功！',
      data: {
        id: user.id,
        nickname: user.nickname,
      },
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(nickname: string) {
    const user = this.users.find((e) => e.nickname == nickname);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
