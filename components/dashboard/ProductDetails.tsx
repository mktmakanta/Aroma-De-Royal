"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  numberOfReviews: number;
};

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.error || "Failed to fetch product");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 md:mt-8">
      <Button
        className="group text-black bg-orange-100/75 hover:bg-orange-200 transition-all duration-200 ring-1 ring-orange-200/75"
        onClick={() => router.back()}
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-200" />
        Go Back
      </Button>
      <div className="flex flex-col md:flex-row gap-5">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg shadow-lg h-[25rem] lg:h-[30rem] lg:w-[26rem]"
          />
        </div>
        <div className="flex-1 md:flex-row md:flex gap-5 space-y-5">
          <div className="flex-1 flex flex-col space-y-3 divide-y divide-slate-300">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center justify-between pt-3">
              <span>{/* Add RatingStars if required */}</span>
              <span>{product.numberOfReviews} Reviews</span>
            </div>
            <p className="text-lg font-semibold pt-3">
              Price: ${product.price}
            </p>
            <p className="pt-3">{product.description}</p>
          </div>
          <div className="md:w-[300px] space-y-3 p-4 ring-1 ring-orange-100 shadow-sm rounded-md divide-y divide-orange-100 max-h-min">
            <p className="flex items-center justify-between">
              <span className="font-semibold">Category:</span>
              {product.category}
            </p>
            <div className="text-sm flex justify-between items-center pt-3">
              <span className="font-semibold">Status:</span>
              <span>
                {product.countInStock > 0
                  ? product.countInStock < 5
                    ? "Low Stock"
                    : "In Stock"
                  : "Out of Stock"}
              </span>
            </div>
            <Button className="mt-6 text-orange-100 hover:text-red-500 rounded-sm transition">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
