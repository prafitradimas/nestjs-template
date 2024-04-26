import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponse } from 'src/common/types/api-response.type';
import { GlobalModule } from '../global/global.module';
import { UserDTO } from '../internal/user/dto/user.dto';
import { UserModule } from '../internal/user/user.module';
import { UserService } from '../internal/user/user.service';
import { UserServiceInterface } from '../internal/user/user.service.interface';
import { AuthService } from './auth.service';

class MockUserService implements UserServiceInterface<UserDTO> {
  async findByUsername(username: string, options?): Promise<UserDTO> {
    if (username !== 'testuser') {
      throw new Error();
    }

    return {
      id: 1,
      username: 'testuser',
      password: 'supersecretpassword',
      active: true,
      role: {
        id: 1,
        name: 'testrole',
        active: true,
      },
    };
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, GlobalModule],
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should success', async () => {
    await expect(
      service.login('testuser', 'supersecretpassword'),
    ).resolves.toBeTruthy();
  });

  it('should error', async () => {
    const matchError = new UnauthorizedException(
      ApiResponse.error({
        code: HttpStatus.UNAUTHORIZED,
        message: '',
        error: {
          title: 'Invalid login credentials',
          message: 'Please submit correct username and password',
          details: ['Username or password is invalid'],
        },
      }),
    );

    await expect(service.login('testuser', 'asdasd')).rejects.toMatchObject(
      matchError,
    );
    await expect(
      service.login('notregisteredusername', 'supersecretpassword'),
    ).rejects.toMatchObject(matchError);
  });
});
