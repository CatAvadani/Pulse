"use client";

import AddToCartButton from "@/components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductListProps {
  products: Product[];
  category: string;
}

export default function ProductList(props: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(props.products);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [category] = useState<string>(props.category);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontFamily: "Times New Roman",
          padding: "10px",
        }}
      >
        <label
          htmlFor="sortOrder"
          style={{ marginRight: "10px", color: "white" }}
        >
          Price:{" "}
        </label>
        <select
          id="sortOrder"
          onChange={(e) => {
            setSortOrder(e.target.value as "asc" | "desc");
            setProducts(
              [...products].sort((p1, p2) =>
                e.target.value === "asc"
                  ? p1.price < p2.price
                    ? -1
                    : 1
                  : p1.price > p2.price
                  ? -1
                  : 1
              )
            );
          }}
          style={{
            fontFamily: "Times New Roman",
            padding: "5px",
          }}
        >
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 py-4 text-center text-xl font-semibold rounded-md" style={{ width: '50%', maxWidth: '400px', height: '100px' }}>
          {category}
        </div>
        <div className="flex justify-center w-full mt-4">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {products.map(({ id, name, image, price, ...rest }) => (
              <Card
                key={id}
                className="flex flex-col w-[400px] h-[600px] p-6 m-4"
                data-cy="product"
              >
                <CardHeader>
                  <CardTitle
                    className="flex justify-center"
                    data-cy="product-title"
                  >
                    {name}
                  </CardTitle>
                </CardHeader>
                <Link href={`/product/${name}/${id}`}>
                  <CardContent className="flex justify-center">
                    <Image
                      src={image || "/placeholder-image.jpg"}
                      alt="product image"
                      width={350} // Adjusted image size
                      height={350}
                    />
                  </CardContent>
                </Link>
                <CardFooter className="flex justify-between items-center">
                  <span data-cy="product-price">${price}</span>
                  <AddToCartButton product={{ id, name, price, image, ...rest }} />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
