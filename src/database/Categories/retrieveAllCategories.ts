import { MongoClient, WithId } from "mongodb";
import getCategoriesCollection from "./getCategoriesCollection";

export default async function retrieveAllCategories(client: MongoClient) {
  const categories = getCategoriesCollection(client);
  const results = await categories.find().sort({ name: 1 }).toArray();
  return results;
}
