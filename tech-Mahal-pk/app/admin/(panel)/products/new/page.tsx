import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Add Product</h1>
        <p className="text-sm text-platinum-400">Naya product website pe add karein</p>
      </div>
      <ProductForm />
    </div>
  );
}
