import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const port = process.env.PORT || 4444;

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
