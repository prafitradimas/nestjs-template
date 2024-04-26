import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PUBLIC_ENDPOINT } from '../decorators/public-api.decorator';
import { ApiResponse } from '../types/api-response.type';
import { Authentication } from '../types/authentication.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ENDPOINT,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        ApiResponse.error({
          code: HttpStatus.UNAUTHORIZED,
          message: '',
          error: {
            title: 'Invalid token',
            message: 'Authorization token must not be empty!',
          },
        }),
      );
    }
    try {
      const auth: Authentication = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = auth;
    } catch {
      throw new UnauthorizedException(
        ApiResponse.error({
          code: HttpStatus.UNAUTHORIZED,
          message: '',
          error: {
            title: 'Invalid token',
            message: 'Please submit correct authorization token',
          },
        }),
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
