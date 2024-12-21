import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// FETCHING ALL THE PRODUCTS
export async function GET(req: NextRequest) {
  try {
    const data = await prisma.product.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}

// ADDING A PRODUCT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        image,
        brand,
        category,
        description,
        price: parseFloat(price),
        countInStock: parseInt(countInStock, 10),
        rating: parseFloat(rating),
        user: {
          connect: { id: "6758a537415771af42469aa0" },
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to add the product. Please try again." },
      { status: 500 }
    );
  }
}
