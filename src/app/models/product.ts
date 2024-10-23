export interface Phones {
  [x: string]: any;
  count: number;
  phones: Phone[];
}

 export  interface Phone {
  name: string;
  id: number;
  title: string;
  image: string;
  price: number;
  short_desc: string;
  category: string;
  quantity: number;
  description: string;
  images: string[];
  items: Phone[];
  totalCount: number;
}
