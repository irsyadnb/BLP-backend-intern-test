import { User } from "../../sequelize/sequelize";

class UserService {
  private userModel = User;

  async getUserById(user_id: number) {
    const user = await this.userModel.findOne({
      where: {
        user_id: user_id,
      },
    });

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({
      where: {
        username: username,
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }
}

export default UserService;
