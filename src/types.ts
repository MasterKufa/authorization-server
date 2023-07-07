import { Socket } from "socket.io";
import { ACTIONS } from "./actions";

export type AuthPayload = { login: string; password: string; id: string };
export type RegisterPayload = AuthPayload;
export type VerifyPayload = { token: string; id: string };

export type Request<T> = T & { requestId?: string };
export type SocketResponse<T = "success" | "error"> = {
  requestId?: string;
  error?: string;
  payload: T;
};

export type ApiHandlers = Record<ACTIONS, ApiHandler>;

export type ApiHandler = (
  socket: Socket,
  payload: unknown,
) => void | Promise<void>;
