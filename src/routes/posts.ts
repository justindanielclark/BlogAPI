import express, { Response, Request, NextFunction } from "express";
import { BSONError, ObjectId } from "bson";
import { MongoClient, WithId } from "mongodb";
import _mongo from "../database/_mongo";
import { Post, JSON_Post } from "../models/Post";
import { match } from "assert";
import removeUnnecessaryWhiteSpace from "../utils/removeUnnecessaryWhitespace";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const databaseClient = req.app.get("db") as MongoClient;
    const newPost = {
      ...req.body,
      post_date: new Date(),
    };
    const writeResult = await _mongo.post.createPost(databaseClient, newPost);
    if (writeResult.acknowledged) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(500);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const databaseClient = req.app.get("db") as MongoClient;
    const results = await _mongo.posts.retrieveAllPosts(databaseClient);
    return res.send(JSON.stringify(results));
  } catch (err) {
    return res.sendStatus(500);
  }
});
router.get("/:postID", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const databaseClient = req.app.get("db") as MongoClient;
    const result = await _mongo.post.retrievePost(databaseClient, req.params.postID);
    if (result === null) {
      return res.sendStatus(404);
    }
    return res.send(JSON.stringify(result));
  } catch (err) {
    //Catch if PostID is not valid configuration for request
    if (err instanceof BSONError) {
      return res.sendStatus(404);
    }
    return res.sendStatus(500);
  }
});
router.put("/:postID", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const databaseClinet = req.app.get("db") as MongoClient;
    const { _id, categories, content, title } = req.body as Omit<JSON_Post, "post_date"> & { _id: string };
    console.log({ _id, categories, content, title });
    if (typeof _id === "string" && typeof content === "string" && typeof title === "string") {
      let allCategoriesAreStrings = true;
      categories.forEach((category) => {
        if (typeof category !== "string" && allCategoriesAreStrings) {
          allCategoriesAreStrings = false;
        }
      });
      if (!allCategoriesAreStrings) return res.sendStatus(400);
      const editedPost: WithId<Post> = {
        _id: new ObjectId(_id),
        categories,
        content: removeUnnecessaryWhiteSpace(content),
        post_date: new Date(),
        title,
      };
      const result = await _mongo.post.updatePost(databaseClinet, editedPost);
      const { acknowledged, matchedCount, modifiedCount } = result;
      if (acknowledged && matchedCount === 1 && modifiedCount === 1) {
        return res.sendStatus(200);
      }
      return res.sendStatus(500);
    }
    return res.sendStatus(400);
  } catch (err) {
    return res.sendStatus(500);
  }
});
//TODO
router.delete("/:postID", async (req: Request, res: Response, next: NextFunction) => {});

export default router;
