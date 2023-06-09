import dotenv from "dotenv";
import express, { Request, Response } from "express";
import logErrors from "./middleware/logErrors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import _mongo from "./database/_mongo";
//Routes
import posts from "./routes/posts";
import categories from "./routes/categories";
import images from "./routes/images";

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
  app.use("/images", images);
  //404
  app.use("*", (req: Request, res: Response) => {
    res.sendStatus(404);
  });
  //ERROR HANDLING
  app.use(logErrors);

  app.listen(port, () => {
    console.log(`Server Running On Port ${port}...`);
  });
}

main();
