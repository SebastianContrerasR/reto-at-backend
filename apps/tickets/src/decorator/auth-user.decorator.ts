import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUserType {
    id: string;
    name: string;
    email: string;
}

// Define the decorator
export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as AuthUserType;
    },
);
