import { MongoClient, ObjectId } from "mongodb";
import getPostCollection from "../Posts/getPostCollection";

export default async function deletePost(client: MongoClient, postId: string) {
  const posts = getPostCollection(client);
  const _postID = new ObjectId(postId);
  const result = posts.deleteOne({ _id: _postID });
  return result;
}
