import { Request, Response } from "express";
import { ResponseHelper } from "../helpers/response.helper";
import TodoService from "../services/todo.service";
import { HttpStatusCode } from "../constants/http.enum";

class TodoController {
  constructor(private todoService: TodoService) {
    this.getTodos = this.getTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async getTodos(req: Request, res: Response) {
    const user_id = res.locals.user.user_id;

    const todos = await this.todoService.getTodos(user_id);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Operation Success",
      todos
    );
  }

  async createTodo(req: Request, res: Response) {
    const { title } = req.body;
    const user_id = res.locals.user.user_id;

    let image_url = "";
    let file_url = "";
    if (Array.isArray(req.files)) {
      const imageFile = req.files[0];
      const otherFile = req.files[1] ?? "";

      image_url = imageFile ? imageFile.filename : "";
      file_url = otherFile ? otherFile.filename : "";
    }

    const todo = await this.todoService.createTodo(
      title,
      user_id,
      image_url,
      file_url
    );

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Operation Success",
      todo
    );
  }

  async updateTodo(req: Request, res: Response) {
    const { title, isDone } = req.body;
    const { todo_id } = req.params;

    let image_url = "";
    let file_url = "";
    if (Array.isArray(req.files)) {
      const imageFile = req.files[0];
      const otherFile = req.files[1] ?? "";

      image_url = imageFile ? imageFile.filename : "";
      file_url = otherFile ? otherFile.filename : "";
    }

    await this.todoService.updateTodoByID(
      todo_id,
      title,
      isDone,
      image_url,
      file_url
    );

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Operation Success"
    );
  }

  async deleteTodo(req: Request, res: Response) {
    const { todo_id } = req.params;

    await this.todoService.deleteTodoByID(todo_id);

    return ResponseHelper.responseSuccess(
      res,
      HttpStatusCode.Ok,
      "Operation Success"
    );
  }
}

export default TodoController;
