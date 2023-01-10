import http from "http";
import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./router/IndexRouter.js";
import { logger } from "./config/winston/winston.js";
import webSocket from "./socket/socket.js";
import fs from "fs";

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use("/", apiRouter);
app.use("/images", express.static("./uploads"));

const httpServer = http.createServer(app);
webSocket(httpServer);

httpServer.listen(4000, () => {
  const dir = "./uploads";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log("app listening on port 4000!");
});

process.on("uncaughtException", (err) => {
  logger.error("an uncaught exception detected : ", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("an unhandled rejection detected : ", err);
  process.exit(1);
});

export default app;
