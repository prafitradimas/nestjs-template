import { UserDTO } from 'src/modules/internal/user/dto/user.dto';

export type AuthToken = {
  access_token: string;

  refresh_token: string;
};

export type AuthDTO = Partial<UserDTO> & {
  token: AuthToken;
};
