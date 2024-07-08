import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../constants/http.enum";
import { HttpException } from "../exceptions/http.exception";
import { jwtAccessToken } from "../configs/jwt";
import { ResponseHelper } from "../helpers/response.helper";

class AuthMiddleware {
  static authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1]; // Bearer Token

      if (!token) {
        throw new HttpException(
          HttpStatusCode.Unauthorized,
          "Invalid credentials"
        );
      }

      jwt.verify(token, jwtAccessToken, (err, user) => {
        if (err) {
          throw new HttpException(
            HttpStatusCode.Unauthorized,
            "Invalid credentials",
            err
          );
        }

        res.locals.user = user;
        next();
      });
    } catch (error) {
      return ResponseHelper.responseError(
        res,
        HttpStatusCode.InternalServerError,
        "Internal Server Errors",
        error as object
      );
    }
  }
}

export default AuthMiddleware;
