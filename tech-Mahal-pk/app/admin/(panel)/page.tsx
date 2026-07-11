import Link from "next/link";
import { FiBox, FiAlertTriangle, FiZap, FiPlusCircle } from "react-icons/fi";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { fromDbRow } from "@/lib/product-mapper";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const { data } = await supabaseAdmin.from("products").select("*");
  const products = (data ?? []).map(fromDbRow);

  const total = products.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const flashDeals = products.filter((p) => p.flashDeal).length;

  const stats = [
    { label: "Total Products", value: total, icon: FiBox, tone: "text-gold-300 bg-gold-500/15" },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: FiAlertTriangle,
      tone: "text-red-400 bg-red-500/15",
    },
    {
      label: "Low Stock (≤5)",
      value: lowStock,
      icon: FiAlertTriangle,
      tone: "text-amber-400 bg-amber-500/15",
    },
    { label: "Active Flash Deals", value: flashDeals, icon: FiZap, tone: "text-signal-400 bg-signal-500/15" },
  ];

  const recentProducts = products.slice(0, 6);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-platinum-400">Tech Mahal PK ka overview</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary btn-sm">
          <FiPlusCircle size={14} /> Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${s.tone}`}>
              <s.icon size={18} />
            </div>
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-platinum-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-white">Recent Products</h2>
          <Link href="/admin/products" className="text-xs font-semibold text-gold-300 hover:text-gold-200">
            View All →
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="glass-card p-8 text-center text-sm text-platinum-400">
            Abhi tak koi product nahi hai. &ldquo;Add Product&rdquo; pe click karke pehla product add karein.
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            {recentProducts.map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}/edit`}
                className="flex items-center gap-4 border-b border-white/5 p-4 transition last:border-0 hover:bg-white/[0.03]"
              >
                <img
                  src={p.images[0] || "/images/logo.png"}
                  alt={p.title}
                  className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{p.title}</p>
                  <p className="text-xs text-platinum-500">
                    {p.brand} · Rs. {p.price.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`chip ${
                    p.stock === 0
                      ? "bg-red-500/15 border-red-500/40 text-red-400"
                      : "chip-muted"
                  }`}
                >
                  {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
