export const formatPrice = (price: any) => {
  //   return price.toString().slice(0, -5);
  let AfterFormat = price.toString().slice(0, -5);
  //FORMAT SHOPEE PRICE !!
  let result = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(parseFloat(AfterFormat));
  return result;
};
