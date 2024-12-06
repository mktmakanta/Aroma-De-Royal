import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all the products to render at Homepage
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
