import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const jwtService = new JwtService();
interface UserInfo {
  id: string;
  name: string;
  email: string;
}
export const GetInfoByToken = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const user = jwtService.decode(token);
    return user as UserInfo;
  },
);
