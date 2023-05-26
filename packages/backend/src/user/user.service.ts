import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {
    this.user = user;
  }
  async create(createUserDto: CreateUserDto) {
    const hadUser = await this.user.findOne({
      where: { email: createUserDto.email },
    });

    if (hadUser) {
      return {
        data: hadUser,
        message: `User with email ${createUserDto.email} already exists`,
      };
    }
    const user = new User(createUserDto);
    return {
      data: await this.user.save(user),
      message: 'User created successfully',
    };
  }

  async findOne({ email, id }: { email: string; id?: number }) {
    return await this.user.findOne({
      where: { email, id },
    });
  }
}
