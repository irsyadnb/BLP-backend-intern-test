import { Request, Router } from "express";
import multer, { FileFilterCallback, Multer } from "multer";
import { extensions } from "../interfaces/file.interface";
import TodoService from "../services/todo.service";
import TodoController from "../controllers/todo.controller";
import ValidationMiddleware from "../middlewares/validation.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import { todoSchema } from "../dtos/todo.dto";

class TodoRoute {
  public router = Router();
  private todoService = new TodoService();
  private todoController = new TodoController(this.todoService);
  private uploadFile: Multer;

  constructor() {
    this.uploadFile = this.initializeMulter();
    this.initializeRoute();
  }

  private initializeMulter() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "src/storage");
      },
      filename: (req, file, cb) => {
        const extension = extensions[file.mimetype];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        extension
          ? cb(null, uniqueSuffix + "_" + file.originalname)
          : cb(null, "");
      },
    });

    const fileFilter = (
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ) => {
      const allowedExtensions = [".pdf", ".png", ".jpeg", ".jpg"];
      const extension = extensions[file.mimetype];

      if (allowedExtensions.includes(extension)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type."));
      }
    };

    return multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    });
  }

  private initializeRoute() {
    this.router.get(
      "/todos",
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.exceptionGuard(this.todoController.getTodos)
    );

    this.router.post(
      "/todo",
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.fileHandler(this.uploadFile),
      ValidationMiddleware.validate(todoSchema),
      ValidationMiddleware.exceptionGuard(this.todoController.createTodo)
    );

    this.router.put(
      "/todo/:todo_id",
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.fileHandler(this.uploadFile),
      ValidationMiddleware.validate(todoSchema),
      ValidationMiddleware.exceptionGuard(this.todoController.updateTodo)
    );

    this.router.delete(
      "/todo/:todo_id",
      AuthMiddleware.authenticateToken,
      ValidationMiddleware.exceptionGuard(this.todoController.deleteTodo)
    );
  }
}

export default TodoRoute;
