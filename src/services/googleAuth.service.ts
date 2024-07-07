import { oauth2Client } from "../googleOAuth";
import { HttpStatusCode } from "../constants/http.enum";
import AuthService from "./auth.service";
import UserService from "./user.service";
import { google } from "googleapis";
import { HttpException } from "../exceptions/http.exception";
import AuthHelper from "../helpers/auth.helper";
import { Response } from "express";

class GoogleAuthService {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  async loginByGoogle(res: Response, code: string) {
    const { tokens } = await oauth2Client.getToken(code as string);

    oauth2Client.setCredentials(tokens);

    const oAuth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oAuth2.userinfo.get();

    if (!data) {
      throw new HttpException(
        HttpStatusCode.Unauthorized,
        "Invalid credentials"
      );
    }

    let user;

    user = await this.userService.getUserByEmail(data.email as string);

    if (!user) {
      const email = data.email as string;
      const username = data.name as string;
      await this.authService.register(email, username, "");
    }

    user = await this.userService.getUserByEmail(data.email as string);

    const accessToken = AuthHelper.createAccessToken(user);

    const refresh_token = AuthHelper.createRefreshToken(user);
    AuthHelper.sendRefreshToken(res, refresh_token);

    return {
      token: {
        accessToken,
      },
    };
  }
}

export default GoogleAuthService;
