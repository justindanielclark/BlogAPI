import { MongoClient, WithId, ObjectId } from "mongodb";
import Post from "../../models/Post";
import getPostCollection from "./getPostCollection";

export default async function updatePost(
  client: MongoClient,
  post: WithId<Post>
) {
  const posts = getPostCollection(client);
  const result = await posts.updateOne({ _id: post._id }, post);
  return result;
}
