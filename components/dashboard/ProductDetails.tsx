import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RatingStars from "../RatingStars";
import { Button } from "../ui/button";

const ProductDetails = ({ product }: { product: any }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 md:mt-8">
      <Button className="group text-black  bg-orange-100/75 hover:bg-orange-200 transition-all duration-200 ring-1 ring-orange-200/75">
        <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-200" />
        <Link href="/">Go Back</Link>
      </Button>
      <div key={product._id} className=" flex flex-col md:flex-row gap-5">
        <div className=" ">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg shadow-lg h-[25rem] lg:h-[30rem] lg:w-[26rem]"
          />
        </div>
        <div className="flex-1 md:flex-row md:flex gap-5 space-y-5">
          <div className=" flex-1 flex flex-col space-y-3 divide-y divide-slate-300">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className=" flex items-center justify-between pt-3">
              <span>
                <RatingStars rating={product.rating} />{" "}
              </span>
              <span>{product.numberOfReviews} Review</span>
            </div>
            <p className="text-lg font-semibold pt-3">
              Price: ${product.price}
            </p>
            <p className="  pt-3">{product.description}</p>
          </div>
          <div className=" md:w-[300px] space-y-3 p-4 ring-1 ring-orange-100  shadow-sm rounded-md divide-y divide-orange-100 max-h-min">
            <p className=" flex items-center justify-between">
              <span className="font-semibold">Category:</span>
              {product.category}
            </p>
            <div className="text-sm flex justify-between items-center pt-3">
              <span className="font-semibold"> Status:</span>{" "}
              <span>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <Link href="/cart">
              <Button className="mt-6   text-orange-100 hover:text-red-500 rounded-sm  transition">
                Add to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
