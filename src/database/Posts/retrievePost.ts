import { MongoClient, WithId, ObjectId } from "mongodb";
import Post from "../../models/Post";
import getPostCollection from "./getPostCollection";

export default async function retrievePost(
  client: MongoClient,
  postID: string
): Promise<WithId<Post>> {
  const posts = getPostCollection(client);
  const result = await posts.findOne<WithId<Post>>({
    _id: new ObjectId(postID),
  });
  return result as WithId<Post>;
}
