export interface CreateTeamSchema {
  name: string;
  admin: {
    username: string;
    password: string;
  };
}
