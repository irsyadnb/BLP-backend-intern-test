import { Model, DataTypes } from "sequelize";
import sequelizeConnection from "../../sequelize/connection";
import Todo from "./todo";

interface UserAttributes {
  user_id?: string;
  username: string;
  email: string;
  password?: string;

  updatedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public user_id!: string;
  public username!: string;
  public email!: string;
  public password?: string;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
  }
);

export default User;
