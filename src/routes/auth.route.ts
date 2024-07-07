import { Router } from "express";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";
import ValidationMiddleware from "../middlewares/validation.middleware";

class AuthRoute {
  public router = Router()
  private authService = new AuthService;
  private authController = new AuthController(this.authService);

  constructor() {
    this.initializeRoute();
  }

  private initializeRoute() {
    this.router.post('/login', ValidationMiddleware.exceptionGuard(this.authController.login))
    this.router.post('/register', ValidationMiddleware.exceptionGuard(this.authController.register))
    this.router.post('/refresh-token', ValidationMiddleware.exceptionGuard(this.authController.refreshToken))
    // this.router.post('/logout')
  }
}

export default AuthRoute;