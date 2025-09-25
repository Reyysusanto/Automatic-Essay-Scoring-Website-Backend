import { SuccessResponse } from './response.type';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export type JwtPayload = {
  user_id: string;
  exp: number;
  iat: number;
  iss: string;
  role: Role;
};

export type Login = {
  access_token: string;
  refresh_token: string;
};

export type RefreshToken = {
  access_token: string;
};

export type LoginResponse = SuccessResponse<Login>;
export type RefreshTokenResponse = SuccessResponse<RefreshToken>;
