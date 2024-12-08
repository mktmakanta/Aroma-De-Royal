import ProductItems from "@/components/dashboard/ProductItems";

export default function Dashboard() {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-10 px-5 h-screen space-y-5">
        <h1 className="text-lg lg:text-2xl "> Latest Products </h1>
        <ProductItems />
      </div>
    </main>
  );
}
