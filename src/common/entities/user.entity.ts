import { BaseEntity } from './base.entity';
import { RoleEntity } from './role.entity';

export class UserEntity extends BaseEntity {
  id: number;

  username: string;

  name: string;

  password: string;

  role: RoleEntity;
}
