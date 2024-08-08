import { Body, Controller, HttpStatus, Inject, Logger, Post, Res } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import config from '../../config';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(config().services.auth.name)
        private authClient: ClientKafka,
    ) { }

    @Post('register')
    async create(@Body() dto: CreateUserDto, @Res() res: Response) {
        Logger.log('Auth Service: Create user');

        const response = await lastValueFrom(
            this.authClient.send<{ success: boolean }>('auth.user.register', dto),
        );

        const { success } = response;

        if (!success) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'User creation failed',
            });
        }

        return res.status(HttpStatus.CREATED).json({
            message: 'user created successfully',
        });
    }

    @Post('login')
    async login(@Body() dto: LoginUserDto, @Res() res: Response) {
        Logger.log('Auth Service: login');

        const response = await lastValueFrom(
            this.authClient.send('auth.user.login', dto),
        );

        if (!response) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'User login failed',
            });
        }

        return res.status(HttpStatus.OK).json(response);
    }

    async onModuleInit() {
        this.authClient.subscribeToResponseOf('auth.user.register');
        this.authClient.subscribeToResponseOf('auth.user.login');
        this.authClient.subscribeToResponseOf('auth.token.check');
        await this.authClient.connect();
    }
}
