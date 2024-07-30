export interface JwtPayload {
  id: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}
