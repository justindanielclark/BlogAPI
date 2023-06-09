import { MongoClient, WithId } from "mongodb";
import Post from "../../models/Post";
import getPostCollection from "./getPostCollection";

export default async function retrieveAllPosts(client: MongoClient): Promise<WithId<Post>[]> {
  const posts = getPostCollection(client);
  const results = await posts
    .find(
      {},
      {
        projection: {
          title: 1,
          post_date: 1,
          categories: 1,
        },
        sort: {
          post_date: -1,
        },
      }
    )
    .toArray();
  return results as WithId<Post>[];
}
