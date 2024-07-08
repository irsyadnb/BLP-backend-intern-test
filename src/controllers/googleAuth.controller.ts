import { Request, Response } from "express";
import GoogleAuthService from "../services/googleAuth.service";
import { ResponseHelper } from "../helpers/response.helper";
import { HttpStatusCode } from "../constants/http.enum";

class GoogleAuthController {
  constructor(private googleAuthService: GoogleAuthService) {
    this.loginByGoogle = this.loginByGoogle.bind(this);
  }

  async loginByGoogle(req: Request, res: Response) {
    const { code } = req.query;
    const data = await this.googleAuthService.loginByGoogle(
      res,
      code as string
    );

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Created,
      "Google OAuth successful",
      data
    );
  }
}

export default GoogleAuthController;
