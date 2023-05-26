import {
  Request,
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
import { TokenEntity } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body): Promise<Partial<TokenEntity>> {
    const user = await this.authService.validate(body.email, body.password);
    if (!user) {
      return {
        code: 1,
        message: 'User not found',
      };
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/register')
  create(@Body() body) {
    return this.authService.register(body);
  }
}
