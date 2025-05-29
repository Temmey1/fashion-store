export interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string; // FIXED: must match backend
  description?: string;
  category?: string;
}


// export interface ProductType {
//   _id: string;
//   name: string;
//   price: number;
//   image?: string;
//   description?: string;
// }
