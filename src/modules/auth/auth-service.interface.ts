import { Authentication } from 'src/common/types/authentication.type';
import { AuthDTO, AuthToken } from './dto/auth.dto';

/**
 * @param D DTO
 */
export interface AuthServiceInterface {
  login(
    username: Readonly<string>,
    password: Readonly<string>,
  ): Promise<AuthDTO>;

  generateToken(payload: Readonly<Authentication>): Promise<AuthToken>;
}
