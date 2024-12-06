import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//Get pathname/params
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  return getProduct(id);
}

// Use the params to get the product
async function getProduct(id: string) {
  try {
    console.log("Product ID:", id);
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        error: `Internal server error: ${
          error instanceof Error ? error.message : error
        }`,
      },
      { status: 500 }
    );
  }
}
