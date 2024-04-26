type Role = {
  id?: number;

  name?: string;

  active?: boolean;
};

export type RoleDTO = Readonly<Role>;
