export interface Products {
  [x: string]: any;
  count: number;
  products: Product[];
}

 export  interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  short_desc: string;
  category: string;
  quantity: number;
  description: string;
  images: string[];
  items: Product[];
  totalCount: number;
}
