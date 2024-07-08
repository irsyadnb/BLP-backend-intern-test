import { Router } from "express";
import AuthRoute from "./auth.route";
import TodoRoute from "./todo.route";

const routers = Router();

routers.use(new AuthRoute().router);
routers.use(new TodoRoute().router);

export default routers;
