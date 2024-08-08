import { CanActivate, ExecutionContext, Inject, Logger } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import config from "../config";

export class AuthGuard implements CanActivate {
    constructor(
        @Inject(config().services.auth.name)
        private readonly client: ClientKafka
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const jwt = req.headers['authorization']?.split(' ')[1];

            const res = await lastValueFrom(
                this.client.send<{ isValid: boolean; payload: any }>('auth.token.check', { jwt }),
            );


            if (res && res.isValid) {
                req.user = { id: res.payload.sub, ...res.payload.user }
                return true;
            }

            return false;
        } catch (err) {
            Logger.error(err);
            return false;
        }
    }

    async onModuleInit() {
        this.client.subscribeToResponseOf('auth.token.check');
        await this.client.connect();
    }
}
