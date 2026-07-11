import Link from "next/link";
import { FiPlusCircle, FiEdit2 } from "react-icons/fi";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { fromDbRow } from "@/lib/product-mapper";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const revalidate = 0;

export default async function AdminProductsPage() {
  const { data } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  const products = (data ?? []).map(fromDbRow);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-platinum-400">{products.length} total</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary btn-sm">
          <FiPlusCircle size={14} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="glass-card p-10 text-center text-sm text-platinum-400">
          Abhi tak koi product nahi hai.
        </div>
      ) : (
        <div className="glass-card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-platinum-500">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Sections</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0] || "/images/logo.png"}
                        alt={p.title}
                        className="h-11 w-11 flex-shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="max-w-[220px] truncate font-medium text-white">{p.title}</p>
                        <p className="text-xs text-platinum-500">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 capitalize text-platinum-300">
                    {p.category.replace("-", " ")}
                  </td>
                  <td className="p-4">
                    <p className="text-white">Rs. {p.price.toLocaleString()}</p>
                    {p.oldPrice ? (
                      <p className="text-xs text-platinum-500 line-through">
                        Rs. {p.oldPrice.toLocaleString()}
                      </p>
                    ) : null}
                  </td>
                  <td className="p-4">
                    <span
                      className={`chip ${
                        p.stock === 0
                          ? "bg-red-500/15 border-red-500/40 text-red-400"
                          : p.stock <= 5
                          ? "bg-amber-500/15 border-amber-500/40 text-amber-400"
                          : "chip-muted"
                      }`}
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {p.featured && <span className="chip-gold">Featured</span>}
                      {p.trending && <span className="chip-gold">Trending</span>}
                      {p.newArrival && <span className="chip-gold">New</span>}
                      {p.bestSeller && <span className="chip-gold">Best Seller</span>}
                      {p.flashDeal && <span className="chip-sale">Flash Deal</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-platinum-400 transition hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300"
                        title="Edit"
                      >
                        <FiEdit2 size={14} />
                      </Link>
                      <DeleteProductButton id={p.id} title={p.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
