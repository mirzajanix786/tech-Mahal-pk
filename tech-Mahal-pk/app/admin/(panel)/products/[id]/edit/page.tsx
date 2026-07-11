import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { fromDbRow } from "@/lib/product-mapper";

export const revalidate = 0;

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !data) notFound();
  const product = fromDbRow(data);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">Edit Product</h1>
        <p className="text-sm text-platinum-400">{product.title}</p>
      </div>
      <ProductForm initialProduct={product} />
    </div>
  );
}
