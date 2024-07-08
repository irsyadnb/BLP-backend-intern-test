"use strict";

import { hash } from "bcryptjs";
import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    const hashedpassword = await hash("admin123", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@example.com",
          password: hashedpassword,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert("Todos", [
      {
        title: "test-todo",
        isDone: false,
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {},
};
