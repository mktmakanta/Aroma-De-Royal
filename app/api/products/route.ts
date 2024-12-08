// pages/api/products/index.ts

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface ProductData {
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  userId: string;
}

type Data = { success: true; product: any } | { success: false; error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      await handleProduct(req, res);
      break;
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body as ProductData;

  try {
    const newProduct = await prisma.product.create({
      data,
    });
    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ success: true, product: products });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
}
