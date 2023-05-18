type Post = {
  categories: Array<string>;
  title: string;
  post_date: Date;
  content: string;
};
type JSON_Post = {
  categories: Array<string>;
  title: string;
  post_date: string;
  content: string;
};

export { Post, JSON_Post };
export default Post;
