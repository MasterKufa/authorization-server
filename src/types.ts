export type AuthPayload = { login: string; password: string };
export type RegisterPayload = AuthPayload;
export type VerifyPayload = { token: string };
