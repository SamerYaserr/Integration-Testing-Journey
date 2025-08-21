import express from "express";
import bodyParser from "body-parser";

import bookRouter from "./modules/Book/Book.routes";

const app = express();

app.use(bodyParser.json());

app.use("/api/books", bookRouter);

export default app;
