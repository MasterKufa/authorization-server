import { AuthPayload, RegisterPayload } from "./types";
import { createHash } from "crypto";
import * as jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { SocketErrors } from "@master_kufa/server-tools";

class UserService {
  buildPasswordHash(password: string) {
    return createHash("sha256").update(password).digest("hex");
  }
  async create(payload: RegisterPayload) {
    const existedUser = await prisma.user.findUnique({
      where: { login: payload.login },
    });

    if (existedUser) throw new Error("User already exists");

    await prisma.user.create({
      data: {
        login: payload.login,
        passwordHash: this.buildPasswordHash(payload.password),
      },
    });
  }

  async auth(payload: AuthPayload) {
    const user = await prisma.user.findUnique({
      where: { login: payload.login },
    });

    if (!user) throw new Error("User does not exist");

    return jwt.sign({ login: user.login }, process.env.JWT_SECRET);
  }

  verify(token: string) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new Error(SocketErrors.UNAUTHORIZED);
    }
  }
}

export const userService = new UserService();
