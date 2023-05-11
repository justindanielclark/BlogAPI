import express, { Response, Request, NextFunction } from "express";
import { BSONError } from "bson";
import { MongoClient } from "mongodb";
import _mongo from "../database/_mongo";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const databaseClient = req.app.get("db") as MongoClient;
    const results = await _mongo.posts.retrieveAllPosts(databaseClient);
    return res.json(results);
  } catch (err) {
    return res.sendStatus(500);
  }
});
router.get("/:postID", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const databaseClient = req.app.get("db") as MongoClient;
    const result = await _mongo.posts.retrievePost(databaseClient, req.params.postID);
    if (result === null) {
      return res.sendStatus(404);
    }
    return res.json(result);
  } catch (err) {
    //Catch if PostID is not valid configuration for request
    if (err instanceof BSONError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const databaseClient = req.app.get("db") as MongoClient;
  console.log(req.body);
  return res.sendStatus(500);
});

//TODO
router.put("/:postID", async (req: Request, res: Response, next: NextFunction) => {});
//TODO
router.delete("/:postID", async (req: Request, res: Response, next: NextFunction) => {});

export default router;
