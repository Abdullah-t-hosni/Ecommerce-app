export interface Cart {
  numOfCartItems: number;
  data: Data;
}

interface Data {
  totalCartPrice: number;
  _id: string;
  product: Product[];
}

interface Product {
  count: number;
  price: number;
  product: innerProduct;
}

interface innerProduct {
  title: string;
  imageCover: string;
  category: Category;
}

interface Category {
  name: string;
}
