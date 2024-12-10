"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/Types/globalTypes";
import ProductDetailsLoader from "@/components/loaders/ProductDetailsLoader";
import ProductDetails from "../_components/ProductDetails";
import axios from "axios";

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
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error || error.message);
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
