import _Categories from "./Categories/_Categories.js";
import createClient from "./createClient.js";
import _Posts from "./Posts/_Posts.js";
import _Post from "./Post/_Post.js";

export default {
  createClient,
  post: _Post,
  posts: _Posts,
  categories: _Categories,
};
