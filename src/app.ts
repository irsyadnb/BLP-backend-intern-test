import express from "express";
import routers from "./routes";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/v1", routers);

export default app;
