import { Model, DataTypes } from "sequelize";
import User from "./user";
import sequelizeConnection from "../../sequelize/connection";

interface TodoAttributes {
  todo_id?: string;
  title: string;
  user_id: string;
  isDone?: boolean;
  image_url?: string;
  file_url?: string;

  updatedAt?: Date;
  createdAt?: Date;
}

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public todo_id!: string;
  public title!: string;
  public user_id!: string;
  public isDone?: boolean;
  public image_url?: string;
  public file_url?: string;
}

Todo.init(
  {
    todo_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    file_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Todo",
  }
);

export default Todo;
