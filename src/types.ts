export type AuthPayload = { login: string; password: string; id: string };
export type RegisterPayload = AuthPayload;
export type VerifyPayload = { token: string; id: string };
