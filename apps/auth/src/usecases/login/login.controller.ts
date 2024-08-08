import { Controller, Inject, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthServiceInterface, UserLogin, UserToken } from "../../services/auth/auth.service.interface";

@Controller()
export class LoginController {
  constructor(
    @Inject('auth-service')
    private readonly authService: AuthServiceInterface
  ) { }

  @MessagePattern('auth.user.login')
  async login(data: UserLogin): Promise<UserToken | null> {
    Logger.log('Auth Service: Login');
    const res = await this.authService.login(data);
    return res
  }
}