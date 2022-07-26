


interface ProductImage {
    id:string;
    path:string;
    imageUpdate:File;
}
export default interface ProductUpdateInf {
    _id?: string;
    title?: string;
    description?: string;
    type?: string;
    image?: [ProductImage];
    price?: string;
    hashtag?: string | Array<string>;
    id?: string;
    colors?: string[];
  }
  