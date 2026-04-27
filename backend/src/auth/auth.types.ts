// src/auth/auth.types.ts

export interface JwtPayload {
  id?: number;
  sub?: number;
  email: string;
  cargo: string;
}
