




export default interface ProductCreateInterface { 
    title?: string;
    description?: string;
    type?: string;
    image?: File[];
    price?: string;
    hashtag?: string | Array<string>;
    colors?: string[];
}