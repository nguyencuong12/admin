export default interface ProductInterface {
  _id?: string;
  title?: string;
  description?: string;
  type?: string;
  image?: string | File;
  price?: string;
  hashtag?: string | Array<string>;
  id?: string;
  imageUpload?: File;
}
