export interface Description {
   short: string;
   long: string;
 }
 
 export interface Color {
   name: string;
   hex: string;
 }
 
 export interface Images {
   mainImage: string;
   gallery: string[];
 }
 
 export interface Product {
   id: number;
   sku: string;
   title: string;
   category: string;
   tags: string[];
   normalPrice: number;
   salePrice: number;
   discountPercentage: number;
   new: boolean;
   description: Description;
   colors: Color[];
   sizes: string[];
   rating: number;
   images: Images;
 }
 