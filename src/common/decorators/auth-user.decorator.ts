import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Authentication } from '../types/authentication.type';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user: Authentication = req.user || {
      id: null,
      username: null,
      role: null,
    };

    return user;
  },
);
