import { FindOptionsSelect } from 'typeorm';

export type FindUserSelectOption<Entity> = Readonly<FindOptionsSelect<Entity>>;
