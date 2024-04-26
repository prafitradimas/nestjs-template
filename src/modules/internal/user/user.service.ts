import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entities/user.entity';
import { CreateUserDto as CreateUserDTO } from './dto/create-user.dto';
import { FindUserSelectOption } from './dto/find-user.dto';
import { UpdateUserDto as UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { UserServiceInterface } from './user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface<UserEntity> {
  create(dto: CreateUserDTO) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByUsername(
    username: Readonly<string>,
    options?: Readonly<FindUserSelectOption<UserEntity>>,
  ): Promise<Readonly<UserDTO>> {
    // if (username !== "testuser") {
    //   throw new Error();
    // }

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, dto: UpdateUserDTO) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
