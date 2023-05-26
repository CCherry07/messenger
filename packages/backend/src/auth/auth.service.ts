import { Injectable } from '@nestjs/common';
import { TokenEntity, User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { jwtContants } from './jwt.contants';

@Injectable()
export class AuthService {
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  constructor(userService: UserService, jwtService: JwtService) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({
      email,
    });
    if (!user) {
      return null;
    }
    if (!(await bcrypt.compare(password, user.hashPassword))) {
      return null;
    }
    return user;
  }

  async login(user: User): Promise<TokenEntity> {
    const { id, email, name } = user;
    return {
      code: 0,
      message: 'Login successfully',
      data: {
        email,
        name,
      },
      token: this.jwtService.sign(
        { name, email, sub: id },
        {
          privateKey: jwtContants.secret,
        },
      ),
    };
  }

  async register(body: any): Promise<any> {
    const { email, password, name } = body;
    const user = await this.userService.findOne({
      email,
    });
    if (user) {
      return {
        code: 1,
        message: `User with email ${email} already exists`,
      };
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await this.userService.create({
      email,
      name,
      hashPassword,
      password,
    });
    return {
      code: 0,
      token: this.jwtService.sign(
        { name, email, sub: newUser.data.id },
        {
          privateKey: jwtContants.secret,
        },
      ),
      message: newUser.message,
    };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      if (!token) return false;
      const id = this.jwtService.verify(token.replace('Bearer ', ''), {
        secret: jwtContants.secret,
      });
      return id;
    } catch (e) {
      return [];
    }
  }
}
