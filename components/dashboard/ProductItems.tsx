"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import RatingStars from "../RatingStars";
import { useGetProductsQuery } from "@/services/products";
import ProductsLoader from "../loaders/ProductsLoader";
interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  countInStock: number;
  rating: number;
  price: number;
}

const ProductItems = () => {
  const { data: products, error, isLoading } = useGetProductsQuery("");

  if (isLoading) return <ProductsLoader />;
  if (error) {
    const errorMessage =
      (error as any)?.data?.message ||
      (error as any)?.error ||
      "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product: Product) => (
        <Card key={product.id} className="w-full max-w-xs mx-auto">
          <Link href={`/${product.id}`}>
            <CardHeader>
              <img
                src={`/images/perfumes/${product.image}.jpg`}
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
            <CardFooter className="flex flex-col items-start">
              <div className="flex gap-2 items-center p-0">
                <RatingStars rating={4.3} /> 20 reviews
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
