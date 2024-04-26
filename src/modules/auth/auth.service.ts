import {
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/common/entities/user.entity';
import { ApiResponse } from 'src/common/types/api-response.type';
import { Authentication } from 'src/common/types/authentication.type';
import { UserDTO } from '../internal/user/dto/user.dto';
import { UserService } from '../internal/user/user.service';
import { UserServiceInterface } from '../internal/user/user.service.interface';
import { AuthServiceInterface } from './auth-service.interface';
import { AuthDTO, AuthToken } from './dto/auth.dto';

@Injectable()
export class AuthService implements AuthServiceInterface {
  readonly #JWT_SECRET: string;
  readonly #JWT_REFRESH_SECRET: string;
  readonly #JWT_EXPIRE_TIME: string;
  readonly #JWT_REFRESH_EXPIRE_TIME: string;

  constructor(
    @Inject(UserService)
    private readonly userService: UserServiceInterface<UserEntity>,
    private readonly jwtService: JwtService,
  ) {
    this.#JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;
    this.#JWT_SECRET = process.env.JWT_SECRET;
    this.#JWT_REFRESH_EXPIRE_TIME = process.env.JWT_REFRESH_EXPIRE_TIME;
    this.#JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  }

  async login(
    username: Readonly<string>,
    password: Readonly<string>,
  ): Promise<AuthDTO> {
    let user: UserDTO;
    try {
      user = await this.userService.findByUsername(username, {
        id: true,
        username: true,
        password: true,
        name: true,
        active: true,
        role: {
          id: true,
          name: true,
        },
      });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(
        ApiResponse.error({
          code: HttpStatus.UNAUTHORIZED,
          message: '',
          error: {
            title: 'Invalid login credentials',
            message: 'Please submit correct username and password',
          },
        }),
      );
    }

    if (
      !user ||
      !user.active ||
      !user.role ||
      !user.role.active ||
      user.password !== password
    ) {
      throw new UnauthorizedException(
        ApiResponse.error({
          code: HttpStatus.UNAUTHORIZED,
          message: '',
          error: {
            title: 'Invalid login credentials',
            message: 'Please submit correct username and password',
          },
        }),
      );
    }

    const auth: Authentication = {
      id: user.id,
      username: user.username,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
    };
    return {
      ...auth,
      token: await this.generateToken(auth),
    };
  }

  async generateToken(payload: Readonly<Authentication>): Promise<AuthToken> {
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.#JWT_SECRET,
        expiresIn: isNaN(+this.#JWT_EXPIRE_TIME)
          ? this.#JWT_EXPIRE_TIME
          : +this.#JWT_EXPIRE_TIME,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: this.#JWT_REFRESH_SECRET,
        expiresIn: isNaN(+this.#JWT_REFRESH_EXPIRE_TIME)
          ? this.#JWT_REFRESH_EXPIRE_TIME
          : +this.#JWT_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
