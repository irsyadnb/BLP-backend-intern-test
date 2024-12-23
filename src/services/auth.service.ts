import { compare, genSalt, hash } from "bcryptjs";
import UserService from "./user.service";
import AuthHelper from "../helpers/auth.helper";
import { Response } from "express";
import { HttpStatusCode } from "../constants/http.enum";
import { HttpException } from "../exceptions/http.exception";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtRefreshToken } from "../configs/jwt";
import { User } from "../../sequelize/models";

class AuthService {
  private userService: UserService;
  private userModel = User;

  constructor() {
    this.userService = new UserService();
  }

  async login(res: Response, username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new HttpException(
        HttpStatusCode.Unauthorized,
        "Invalid credentials"
      );
    }
    const isValidPassword = await compare(
      password,
      user.getDataValue("password") as string
    );
    if (!isValidPassword) {
      throw new HttpException(
        HttpStatusCode.Unauthorized,
        "Invalid credentials"
      );
    }
    const accessToken = AuthHelper.createAccessToken(user);

    const refresh_token = AuthHelper.createRefreshToken(user);
    AuthHelper.sendRefreshToken(res, refresh_token);

    return {
      user: {
        user_id: user.getDataValue("user_id"),
        username: user.getDataValue("username"),
        email: user.getDataValue("email"),
      },
      token: {
        accessToken,
      },
    };
  }

  async register(
    email: string,
    username: string,
    password: string | undefined
  ) {
    let hashedPassword = password;

    if (password) hashedPassword = await hash(password, await genSalt());

    await this.userModel.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
  }

  async refreshToken(res: Response, refreshToken: string | null) {
    if (!refreshToken) {
      throw new HttpException(
        HttpStatusCode.Unauthorized,
        "Invalid credentials"
      );
    }

    let payload: string | JwtPayload | undefined;

    jwt.verify(refreshToken, jwtRefreshToken, (err, decoded) => {
      if (err) {
        throw new HttpException(
          HttpStatusCode.Unauthorized,
          "Invalid credentials"
        );
      }

      payload = decoded;
    });

    // Token is valid
    if (typeof payload !== "string" && payload && "user_id" in payload) {
      const user = await this.userService.getUserById(payload.user_id);

      if (!user) {
        throw new HttpException(
          HttpStatusCode.Unauthorized,
          "Invalid credentials"
        );
      }

      // User is valid
      // Refresh the token
      const newRefreshToken = AuthHelper.createRefreshToken(user);

      // Send it to cookie
      AuthHelper.sendRefreshToken(res, newRefreshToken);

      // Make acess token
      const accessToken = AuthHelper.createAccessToken(user);

      return {
        token: accessToken,
      };
    } else {
      throw new HttpException(
        HttpStatusCode.Unauthorized,
        "Invalid credentials"
      );
    }
  }
}

export default AuthService;
