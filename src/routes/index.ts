import { Router } from "express";
import AuthRoute from "./auth.route";

const routers = Router();

routers.use(new AuthRoute().router);

export default routers;
