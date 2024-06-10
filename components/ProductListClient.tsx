import {Product} from "@prisma/client";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductListClient({products}: ProductListProps) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-7xl lg:mx-auto mx-5 mt-5">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
