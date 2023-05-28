import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  getUsers(@Body() createUserDto: Partial<CreateUserDto>) {
    return this.userService.findAllNotMe({ email: createUserDto.email });
  }
}
