import dotenv from "dotenv";
import app from "./app";
import { initDatabase } from "../sequelize/sequelize";

dotenv.config();
const port = process.env.PORT || 4444;

app.listen(port, async () => {
  await initDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});
