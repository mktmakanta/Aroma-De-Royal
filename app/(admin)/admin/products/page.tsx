"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import DeleteAProduct from "../../_componnents/DeleteAProduct";

const ProductList = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/example");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-6 ">Product List</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((item) => (
          <Card key={item.id} className="shadow-lg">
            <CardHeader className="p-0 relative">
              {/* Displaying product image */}
              <Image
                src={`/images/perfumes/${item.image}.jpg`}
                alt={item.name}
                width={400}
                height={400}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge className="absolute top-4 left-4 bg-gray-800 text-white">
                {item.category}
              </Badge>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold">
                {item.name}
              </CardTitle>
              <CardDescription className="text-gray-500 mb-2">
                {item.description}
              </CardDescription>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Brand:
                  </span>{" "}
                  <span className="font-bold">{item.brand}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Price:
                  </span>{" "}
                  <span className="font-bold">${item.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Stock:
                  </span>{" "}
                  <span className="font-bold">{item.countInStock}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Rating:{item.rating}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <DeleteAProduct productId={item.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
