import _mongo from "./_mongo";
import dotenv from "dotenv";

import Post from "../models/Post";

async function main() {
  dotenv.config();
  const client = await _mongo.createClient(process.env.MONGO_URI);
  const result = await _mongo.posts.retrievePost(
    client,
    "645ba198e051f820ecd882b7"
  );
  console.log(result);
}

main();
