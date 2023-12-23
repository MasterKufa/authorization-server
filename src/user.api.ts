import { userService } from "./user.service";
import { ACTIONS } from "./actions";
import { RegisterPayload, VerifyPayload } from "./types";
import { Request, Api } from "@master_kufa/server-tools";

export const userApiHandlers = {
  [ACTIONS.AUTH]: (payload: Request<RegisterPayload>) =>
    userService.auth(payload),
  [ACTIONS.REGISTER]: (payload: Request<RegisterPayload>) =>
    userService.create(payload),
  [ACTIONS.VERIFY]: (payload: Request<VerifyPayload>) =>
    userService.verify(payload.token),
};

export const userApi = new Api(userApiHandlers);
