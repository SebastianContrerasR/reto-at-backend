import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcrypt";
import { Repository } from "typeorm";
import { User } from "../../entities/user";
import { AuthServiceInterface, UserLogin, UserToken } from "./auth.service.interface";

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async login(userLogin: UserLogin): Promise<UserToken | null> {

    const user = await this.userRepository.findOneBy({ email: userLogin.email });
    if (!user) {
      return null;
    }

    if (compareSync(userLogin.password, user.password)) {
      const userPayload = {
        name: user.name,
        email: user.email,
      }
      const payload = { user: userPayload, sub: user.id };

      return {
        userId: user.id,
        accessToken: this.jwtService.sign(payload)
      };
    }

    return null;

  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }
}