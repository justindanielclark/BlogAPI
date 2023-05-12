import { MongoClient } from "mongodb";

export default function getCategoriesCollection(client: MongoClient) {
  return client.db("Portfolio_Blog").collection("Categories");
}
