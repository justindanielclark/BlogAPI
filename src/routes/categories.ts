import express, { Response, Request } from "express";
import { MongoClient } from "mongodb";
import _mongo from "../database/_mongo";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const databaseClient = req.app.get("db") as MongoClient;
    const results = await _mongo.categories.retrieveAllCategories(databaseClient);
    const returnable = results.map((item) => item.name);
    return res.json(returnable);
  } catch (err) {
    return res.sendStatus(500);
  }
});

export default router;
