import { Todo } from "../../sequelize/models";
import { HttpException } from "../exceptions/http.exception";
import { HttpStatusCode } from "../constants/http.enum";
import path from "path";
import fs from "fs";
import lib from "../lib";

class TodoService {
  private todoModel = Todo;

  async getTodos(user_id: string) {
    const todos = await this.todoModel.findAll({
      where: {
        isDone: false,
        user_id: user_id,
      },
      order: [["updatedAt", "DESC"]],
    });

    return todos;
  }

  async createTodo(
    title: string,
    user_id: string,
    image_url: string = "",
    file_url: string = ""
  ) {
    return await this.todoModel.create({
      title: title,
      user_id: user_id,
      image_url: image_url,
      file_url: file_url,
    });
  }

  async updateTodoByID(
    todo_id: string,
    title: string,
    isDone: boolean,
    image_url: string,
    file_url: string
  ) {
    const isTodoExist = await this.todoModel.findOne({
      where: {
        todo_id: todo_id,
      },
    });

    if (!isTodoExist) {
      throw new HttpException(HttpStatusCode.NotFound, "Todo not exist");
    }

    const todo = await this.todoModel.update(
      {
        title: title ?? isTodoExist.getDataValue("title"),
        isDone: isDone ?? isTodoExist.getDataValue("isDone"),
        image_url: image_url ?? isTodoExist.getDataValue("image_url"),
        file_url: file_url ?? isTodoExist.getDataValue("file_url"),
      },
      {
        where: {
          todo_id: todo_id,
        },
      }
    );

    if (!todo) {
      throw new HttpException(
        HttpStatusCode.InternalServerError,
        "Update failed."
      );
    }
  }

  async deleteTodoByID(todo_id: string) {
    const isTodoExist = await this.todoModel.findOne({
      where: {
        todo_id: todo_id,
      },
    });

    if (!isTodoExist) {
      throw new HttpException(HttpStatusCode.NotFound, "Todo not exist");
    }

    const image_url = (isTodoExist.getDataValue("image_url") as string) ?? null;
    const file_url = (isTodoExist.getDataValue("file_url") as string) ?? null;

    const todo = await this.todoModel.destroy({
      where: {
        todo_id: todo_id,
      },
    });

    if (!todo) {
      throw new HttpException(
        HttpStatusCode.InternalServerError,
        "Delete failed."
      );
    }

    if (image_url) lib.deleteFile(image_url as string);

    if (file_url) lib.deleteFile(file_url as string);
  }
}

export default TodoService;
