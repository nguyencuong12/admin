export default interface Product {
  title?: string;
  description?: string;
  type?: string;
  image?: File;
  price?: string;
  hashtag?: string | Array<string>;
}
