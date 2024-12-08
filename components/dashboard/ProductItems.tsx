"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";

//data for now
import Products from "@/data/products";

import { Product } from "@/Types/globalTypes";
import RatingStars from "../RatingStars";
import ProductsLoader from "../loaders/ProductsLoader";

const ProductItems = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <ProductsLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <Card key={product.id} className="w-full max-w-xs mx-auto">
          <Link href={`/check/${product.id}`}>
            <CardHeader>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <CardDescription className="text-sm text-gray-600 mt-2">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter className=" flex flex-col items-start">
              <div className="flex gap-2 items-center p-0 ">
                <RatingStars rating={product.rating} /> 20 reviews
              </div>
              <div className="text-xl py-2 font-semibold">
                $ {product.price}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ProductItems;
