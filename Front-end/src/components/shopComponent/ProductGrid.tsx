import React from 'react';
import { Product } from '../../shared/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
   products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
   return (
      <div className="max-w-[1440px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 my-[40px] mx-0 [1535px]:mx-24">
         {products.map((product) => (
            <ProductCard key={product.id} product={product} />
         ))}
      </div>
   );
};

export default ProductGrid;