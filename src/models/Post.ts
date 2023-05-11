import Content from "./Content";

type Post = {
  title: string;
  post_date: Date;
  content: Array<Content>;
};

export default Post;
