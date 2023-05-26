import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // const res = context.switchToHttp().getResponse();
    /**
     * @如果白名单数组中存在路径
     */
    if (this.hasUrl(this.urlList, req.url)) return true;

    try {
      const accessToken = req.get('Authorization');
      if (!accessToken) throw new UnauthorizedException('请先登录');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: true,
      });
      const authService = app.get(AuthService);
      const userService = app.get(UserService);
      const user = await authService.verifyToken(accessToken);
      if (Object.keys(user).length > 0) {
        const resData = await userService.findOne({
          email: user.email,
          id: user.sub,
        });
        if (resData) return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  private urlList: string[] = ['/auth/login', '/auth/register'];

  private hasUrl(urlList: string[], url: string): boolean {
    return urlList.includes(url);
  }
}
