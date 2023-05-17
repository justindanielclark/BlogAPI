import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import logErrors from "./middleware/logErrors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
//Routes
import posts from "./routes/posts";
import categories from "./routes/categories";
import _mongo from "./database/_mongo";

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT || 3000;
  const client = await _mongo.createClient(process.env.MONGO_URI);
  app.set("db", client);
  //MIDDLEWARE
  app.use(express.static(__dirname + "/../public"));
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  //ROUTES
  app.use("/posts", posts);
  app.use("/categories", categories);
  //404
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404);
  });
  //ERROR HANDLING
  app.use(logErrors);

  app.listen(port, () => {
    console.log(`Server Running On Port ${port}...`);
  });
}

main();
