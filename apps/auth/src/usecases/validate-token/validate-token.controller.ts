import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthServiceInterface } from "../../services/auth/auth.service.interface";

@Controller()
export class ValidateTokenController {
  constructor(
    @Inject('auth-service')
    private readonly authService: AuthServiceInterface
  ) { }

  @MessagePattern('auth.token.check')
  async validateToken(data: { jwt: string }) {
    try {
      const res = await this.authService.validateToken(data.jwt);

      return { isValid: true, payload: res };
    } catch (e) {
      return { isValid: false, payload: null };
    }
  }
}