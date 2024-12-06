import prisma from "@/lib/prisma"; // Import Prisma instance
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    // Log the incoming product ID
    console.log("Product ID:", params.id);

    // Fetch product from the database by its ID
    const product = await prisma.product.findUnique({
      where: {
        id: params.id, // Use the ID from the route parameter
      },
      include: {
        user: true, // Optionally, include user data if needed
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
