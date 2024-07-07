import { Request, Response } from "express";
import AuthHelper from "../helpers/auth.helper";
import AuthService from "../services/auth.service";
import { HttpStatusCode } from "../constants/http.enum";
import { ResponseHelper } from "../helpers/response.helper";

class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const data = await this.authService.login(res, username, password);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Login successful",
      data
    );
  }

  async register(req: Request, res: Response) {
    const { email, username, fullname, password } = req.body;
    console.log(fullname);
    await this.authService.register(email, username, password);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Created,
      "Register successful"
    );
  }

  public async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.jid;
    const responseData = await this.authService.refreshToken(res, refreshToken);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Token has been refreshed",
      responseData
    );
  }

  public async logout(req: Request, res: Response) {
    // Delete refresh token in the cookie
    AuthHelper.sendRefreshToken(res, "");

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Logout successful"
    );
  }
}

export default AuthController;
