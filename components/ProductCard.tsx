import {Product} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  return (
    <Card
      key={product.id}
      className="flex flex-col rounded-sm w-full"
      data-cy="product"
    >
      <CardHeader>
        <CardTitle className="text-center">{product.name}</CardTitle>
      </CardHeader>
      <Link href={`/product/${product.name}/${product.id}`}>
        <CardContent className="flex justify-center">
          <Image
            src={product.image || "/placeholder-image.jpg"}
            alt="product image"
            width={150}
            height={150}
            className="object-cover"
          />
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        <span data-cy="product-price">${product.price}</span>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
