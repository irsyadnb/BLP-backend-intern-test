require("dotenv").config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST_LOCAL,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: POSTGRES_HOST_LOCAL,
    port: POSTGRES_PORT,
    dialect: "postgres",
  },
};
