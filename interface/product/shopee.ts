
import { keys } from 'ts-transformer-keys';

interface imageInterface {
    catid: number;
    display_name: string;
    is_default_subcat: boolean;
    no_sub: boolean;
}
interface attributesInterface{
    brand_option: string;
    id: number;
    is_timestamp:boolean;
    name: string;
    val_id: string;
    value: string;
}

export default interface ShopeeInf {
    name: string;
    description: string;
    itemid: string;
    shopid: string;
    shop_location: string;
    image: string;
    images: [imageInterface];
    show_discount: 50;
    stock: number;
    price: number;
    categories: string[];
    brand:string;
    discount:string;
    attributes:[attributesInterface];
}

const keysOfProps = keys<ShopeeInf>();
console.log("KEY",keysOfProps);




