type Paragraph = {
  type: "paragraph";
  content: string;
};

type Image = {
  type: "image";
  url: string;
};

type Header = {
  type: "header";
  content: string;
};

type Content = Paragraph | Image | Header;

export default Content;
