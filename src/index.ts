import { Server, Socket } from "socket.io";
import { ACTIONS } from "./actions";
import { userApi } from "./user.api";

const io = new Server(3000);

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
