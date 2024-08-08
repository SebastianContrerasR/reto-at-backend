import { Controller, Inject, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CreateUser, UserServiceInterface } from "../../services/user/user.service.interface";

@Controller()
export class RegisterController {
    constructor(
        @Inject('user-service')
        private readonly userService: UserServiceInterface
    ) { }

    @MessagePattern('auth.user.register')
    async createUser(data: CreateUser): Promise<{ success: boolean }> {
        Logger.log('Register user');
        const success = await this.userService.create(data);
        return { success };
    }
}
