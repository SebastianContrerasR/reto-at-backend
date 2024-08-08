import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { User } from './entities/user';
import { AuthService } from './services/auth/auth.service';
import { LoginController } from './usecases/login/login.controller';
import { RegisterController } from './usecases/register-user/register-user.controller';
import { ValidateTokenController } from './usecases/validate-token/validate-token.controller';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: config().jwt.secret,
      signOptions: { expiresIn: config().jwt.expiresIn },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().postgres.host,
      port: config().postgres.port,
      username: config().postgres.username,
      password: config().postgres.password,
      database: config().postgres.database,
      synchronize: true,
      entities: [User],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [LoginController, RegisterController, ValidateTokenController],
  providers: [
    {
      provide: 'auth-service',
      useClass: AuthService,
    },
    {
      provide: 'user-service',
      useClass: UserService,
    }
  ],
})
export class AppModule { }
