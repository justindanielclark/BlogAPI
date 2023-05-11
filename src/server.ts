import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import httpErrors from "http-errors";
import logErrors from "./middleware/logErrors";
import cookieParser from "cookie-parser";
//Routes
import posts from "./routes/posts";
import _mongo from "./database/_mongo";
import setHeadersAndStatusOK from "./middleware/setHeadersAndStatusOK";

dotenv.config();

// process.env.NODE_ENV = "production";
async function main() {
  const app = express();
  const port = process.env.PORT || 3000;
  const client = await _mongo.createClient(process.env.MONGO_URI);
  app.set("db", client);
  //MIDDLEWARE
  app.use(express.static(__dirname + "/../public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(setHeadersAndStatusOK);
  //ROUTES
  app.use("/posts", posts);

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(httpErrors(404));
  });

  //Error Handling Middleware (must be last)
  app.use(logErrors);

  app.listen(port, () => {
    console.log(`Server Running On Port ${port}...`);
  });
}

main();
