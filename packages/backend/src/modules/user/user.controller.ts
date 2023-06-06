import { Controller, Post, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetInfoByToken } from 'src/get-info-by-token/get-info-by-token.decorator';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  getUsers(@Body() createUserDto: Partial<CreateUserDto>) {
    return this.userService.findAllNotMe({ email: createUserDto.email });
  }

  @Patch('update')
  updateUser(
    @GetInfoByToken() info,
    @Body() createUserDto: Partial<CreateUserDto>,
  ) {
    console.log('info', createUserDto);

    return this.userService.updateUser({ ...createUserDto }, info);
  }
}
