import { Router } from "express";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";
import ValidationMiddleware from "../middlewares/validation.middleware";
import { authorizationUrl } from "../googleOAuth";
import GoogleAuthController from "../controllers/googleAuth.controller";
import GoogleAuthService from "../services/googleAuth.service";

class AuthRoute {
  public router = Router();
  private authService = new AuthService();
  private googleAuthService = new GoogleAuthService();
  private authController = new AuthController(this.authService);
  private googleController = new GoogleAuthController(this.googleAuthService);

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.get("/auth/google", (req, res) => {
      res.redirect(authorizationUrl);
    });
    this.router.get(
      "/auth/google/callback",
      ValidationMiddleware.exceptionGuard(this.googleController.loginByGoogle)
    );
    this.router.post(
      "/login",
      ValidationMiddleware.exceptionGuard(this.authController.login)
    );
    this.router.post(
      "/register",
      ValidationMiddleware.exceptionGuard(this.authController.register)
    );
    this.router.post(
      "/refresh-token",
      ValidationMiddleware.exceptionGuard(this.authController.refreshToken)
    );
    // this.router.post('/logout')
  }
}

export default AuthRoute;
