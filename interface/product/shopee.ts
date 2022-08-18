interface imageInterface {
  catid: number;
  display_name: string;
  is_default_subcat: boolean;
  no_sub: boolean;
}
interface attributesInterface {
  brand_option: string;
  id: number;
  is_timestamp: boolean;
  name: string;
  val_id: string;
  value: string;
}

export default interface ShopeeInf {
  title: string;
  description: string;
  itemid: string;
  shopid: string;
  shop_location: string;
  image: string;
  images: [imageInterface];
  stock: number;
  price: number;
  categories: string[];
  brand: string;
  discount: string;
  attributes: [attributesInterface];
  tag: string[];
  affilate:string;
}
