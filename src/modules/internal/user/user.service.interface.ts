import { FindUserSelectOption } from './dto/find-user.dto';
import { UserDTO } from './dto/user.dto';

/**
 * @param E Entity
 */
export interface UserServiceInterface<E> {
  findByUsername(
    username: Readonly<string>,
    options?: FindUserSelectOption<E>,
  ): Promise<UserDTO>;
}
