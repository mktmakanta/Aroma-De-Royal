"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/Types/globalTypes";
import ProductDetailsLoader from "@/components/loaders/ProductDetailsLoader";
import ProductDetails from "@/components/dashboard/ProductDetails";

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(params);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
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

    fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailsLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {product && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductPage;
