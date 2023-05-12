import Content from "./Content";

type Post = {
  categories: Array<string>;
  title: string;
  post_date: Date;
  content: Array<Content>;
};

export default Post;
