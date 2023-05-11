import { MongoClient } from "mongodb";

export default function getPostCollection(client: MongoClient) {
  return client.db("Portfolio_Blog").collection("Post");
}
