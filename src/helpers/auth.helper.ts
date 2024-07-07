import { Response } from "express";
import {
  jwtAccessToken,
  jwtAccessTokenExpiration,
  jwtRefreshToken,
  jwtRefreshTokenExpiration,
} from "../configs/jwt";
import jwt from "jsonwebtoken";
import { Model } from "sequelize";

class AuthHelper {
  static createAccessToken = (user: Model | any) => {
    return jwt.sign(
      {
        user_id: user.getDataValue("user_id"),
        username: user.getDataValue("username"),
      },
      jwtAccessToken,
      {
        expiresIn: jwtAccessTokenExpiration,
      }
    );
  };

  static createRefreshToken = (user: Model | any) => {
    return jwt.sign(
      {
        user_id: user.getDataValue("user_id"),
        username: user.getDataValue("username"),
      },
      jwtRefreshToken,
      {
        expiresIn: jwtRefreshTokenExpiration,
      }
    );
  };

  static sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
      httpOnly: true,
      path: "/api/v1/refresh_token",
    });
  };
}

export default AuthHelper;
