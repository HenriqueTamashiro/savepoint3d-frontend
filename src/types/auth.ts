export interface AuthSession {
  accessToken: string;
  user: string;
  role: string;
}

export interface JwtPayload {
  sub: string;
  user: string;
  role: string;
  exp?: number;
}
