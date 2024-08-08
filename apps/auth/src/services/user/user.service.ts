import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../entities/user";
import { CreateUser, UserServiceInterface } from "./user.service.interface";
import { randomUUID } from "crypto";

@Injectable()
export class UserService implements UserServiceInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(createUser: CreateUser): Promise<boolean> {
        try {

            const user = new User();
            user.id = randomUUID();
            user.name = createUser.name;
            user.email = createUser.email;
            user.password = createUser.password;
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }
}