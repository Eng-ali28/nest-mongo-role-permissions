import { User } from 'src/modules/users/schemas/user.schema';

export type AuthResponeType = User & {
  accessToken: string;
  refreshToken: string;
};
