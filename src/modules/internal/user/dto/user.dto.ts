import { RoleDTO } from '../../role/dto/role.dto';

type User = {
  id?: number;
  username?: string;
  password?: string;
  name?: string;
  active?: boolean;
  role?: RoleDTO;
};

export type UserDTO = Readonly<User>;
