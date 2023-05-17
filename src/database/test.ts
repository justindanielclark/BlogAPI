import _mongo from "./_mongo";
import dotenv from "dotenv";
import textToHTMLConverter from "../utils/textToHTMLConverter";

async function main() {
  dotenv.config();
  const client = await _mongo.createClient(process.env.MONGO_URI);
  let content = await textToHTMLConverter();
  if (!content) {
    content = "<p>Error in textToHTMLConverter()</p>";
  }
  const result = await _mongo.posts.createPost(client, {
    title: "My First Post",
    categories: ["typescript"],
    content,
    post_date: new Date(),
  });
  console.log(result);
}

main();
