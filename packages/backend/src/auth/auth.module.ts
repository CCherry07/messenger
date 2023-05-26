import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './jwt.contants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtContants.secret,
      signOptions: { expiresIn: 3600 * 24 * 7 + 's' },
      privateKey: jwtContants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
