import { Body, Controller, Get, Inject, Post, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicEndpoint } from 'src/common/decorators/public-api.decorator';
import { ApiResponse } from 'src/common/types/api-response.type';
import { AuthServiceInterface } from './auth-service.interface';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly service: AuthServiceInterface,
  ) {}

  @PublicEndpoint()
  @Version('1')
  @Post('v1/login')
  async login(@Body() payload: LoginDTO) {
    return ApiResponse.success({
      results: await this.service.login(payload.username, payload.password),
    });
  }

  @Get()
  async hello() {
    return 'Hello';
  }
}
