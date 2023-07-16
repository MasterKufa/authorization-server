import { Socket } from "socket.io";
import { ACTIONS } from "./actions";
import { userApi } from "./user.api";
import { createServer } from "@master_kufa/server-tools";

const io = createServer();

io.on("connection", (socket: Socket) => {
  socket.on(ACTIONS.AUTH, userApi.handle.bind(userApi, ACTIONS.AUTH, socket));
  socket.on(
    ACTIONS.REGISTER,
    userApi.handle.bind(userApi, ACTIONS.REGISTER, socket),
  );
  socket.on(
    ACTIONS.VERIFY,
    userApi.handle.bind(userApi, ACTIONS.VERIFY, socket),
  );
});
