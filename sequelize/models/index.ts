import User from "./user";
import Todo from "./todo";

Todo.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Todo, { foreignKey: "user_id" });

export { User, Todo };
