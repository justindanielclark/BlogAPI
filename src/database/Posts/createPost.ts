import { MongoClient } from "mongodb";
import Post from "../../models/Post";
import getPostCollection from "./getPostCollection";

export default async function createPost(client: MongoClient, post: Post) {
  const posts = getPostCollection(client);
  const result = await posts.insertOne(post);
  return result;
}
