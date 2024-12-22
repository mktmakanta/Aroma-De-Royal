import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

//FETCHING A SINGLE PRODUCT
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch the product. Please try again." },
      { status: 500 }
    );
  }
}

// DELETING A SINGLE PRODUCT// DELETING A SINGLE PRODUCT

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log(`Deleting product with ID: ${id}`);

  if (!id) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete the product. Please try again." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
    console.log("Prisma Client disconnected.");
  }
}

// UPDATING A PRODUCT
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await req.json();
    const {
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      image,
    } = body;

    if (
      !name &&
      !brand &&
      !description &&
      !category &&
      !price &&
      !countInStock &&
      !rating &&
      !image
    ) {
      return NextResponse.json(
        { error: "some fields are empty" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        ...(name && { name }),
        ...(brand && { brand }),
        ...(category && { category }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(countInStock && { countInStock: parseInt(countInStock) }),
        ...(rating && { rating: parseFloat(rating) }),
        ...(image && { image }),
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update the product. Please try again." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
