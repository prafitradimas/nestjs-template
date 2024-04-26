import { FindOptionsSelect } from 'typeorm';

export type FindRoleSelectOption<Entity> = Readonly<FindOptionsSelect<Entity>>;
