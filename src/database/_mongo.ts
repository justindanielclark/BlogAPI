import _Categories from "./Categories/_Categories.js";
import createClient from "./createClient.js";
import _Posts from "./Posts/_Posts.js";

export default {
  createClient,
  posts: _Posts,
  categories: _Categories,
};
