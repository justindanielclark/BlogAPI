import { MongoClient, WithId, ObjectId } from "mongodb";
import Post from "../../models/Post";
import getPostCollection from "../Posts/getPostCollection";

export default async function updatePost(client: MongoClient, post: WithId<Post>) {
  const posts = getPostCollection(client);
  const result = await posts.updateOne({ _id: new ObjectId(post._id) }, { $set: { ...post } });
  return result;
}
