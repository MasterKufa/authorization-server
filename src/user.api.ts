import { userService } from "./user.service";
import { ACTIONS } from "./actions";
import { Socket } from "socket.io";
import {
  ApiHandlers,
  RegisterPayload,
  SocketResponse,
  VerifyPayload,
} from "./types";

class Api {
  constructor(private handlers: ApiHandlers) {}

  async handle(action: ACTIONS, socket: Socket, payload: { id?: string }) {
    try {
      await this.handlers[action](socket, payload);
    } catch ({ message }) {
      payload.id && socket.emit(action, { id: payload.id, error: message });
    }
  }
}

export const userApi = new Api({
  [ACTIONS.AUTH]: async (socket: Socket, payload: RegisterPayload) => {
    const token = await userService.auth(payload);
    const successResponse: SocketResponse<string> = {
      id: payload.id,
      payload: token,
    };

    socket.emit(ACTIONS.AUTH, successResponse);
  },
  [ACTIONS.REGISTER]: async (socket: Socket, payload: RegisterPayload) => {
    await userService.create(payload);
    const successResponse: SocketResponse = {
      id: payload.id,
      payload: "success",
    };

    socket.emit(ACTIONS.REGISTER, successResponse);
  },
  [ACTIONS.VERIFY]: (socket: Socket, payload: VerifyPayload) => {
    userService.verify(payload.token);
    const successResponse: SocketResponse = {
      id: payload.id,
      payload: "success",
    };

    socket.emit(ACTIONS.VERIFY, successResponse);
  },
});
