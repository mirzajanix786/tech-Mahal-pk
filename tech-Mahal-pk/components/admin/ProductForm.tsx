"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUploadCloud, FiX, FiLoader } from "react-icons/fi";
import { Product } from "@/types/product";
import { categories } from "@/data/categories";

interface ProductFormProps {
  initialProduct?: Product;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const sectionOptions: { key: keyof Product; label: string; hint: string }[] = [
  { key: "featured", label: "Featured", hint: "Homepage ke 'Featured Products' section mein" },
  { key: "trending", label: "Trending", hint: "'Trending Right Now' section mein" },
  { key: "newArrival", label: "New Arrivals", hint: "'New Arrivals' section mein + 'New' badge" },
  { key: "bestSeller", label: "Best Seller", hint: "'Best Sellers' section mein" },
  { key: "flashDeal", label: "Flash Deal", hint: "'Flash Deals' countdown section mein" },
];

export default function ProductForm({ initialProduct }: ProductFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProduct);

  const [title, setTitle] = useState(initialProduct?.title ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [price, setPrice] = useState(initialProduct?.price?.toString() ?? "");
  const [oldPrice, setOldPrice] = useState(initialProduct?.oldPrice?.toString() ?? "");
  const [category, setCategory] = useState(initialProduct?.category ?? categories[0].slug);
  const [brand, setBrand] = useState(initialProduct?.brand ?? "");
  const [stock, setStock] = useState(initialProduct?.stock?.toString() ?? "10");
  const [rating, setRating] = useState(initialProduct?.rating?.toString() ?? "4.5");
  const [reviewCount, setReviewCount] = useState(initialProduct?.reviewCount?.toString() ?? "0");
  const [images, setImages] = useState<string[]>(initialProduct?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [sections, setSections] = useState<Record<string, boolean>>({
    featured: initialProduct?.featured ?? false,
    trending: initialProduct?.trending ?? false,
    newArrival: initialProduct?.newArrival ?? false,
    bestSeller: initialProduct?.bestSeller ?? false,
    flashDeal: initialProduct?.flashDeal ?? false,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload nahi ho saka.");
      } else {
        setImages((prev) => [...prev, data.url]);
      }
    } catch {
      setError("Upload ke dauran masla ho gaya.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!title || !slug || !price || !category || images.length === 0) {
      setError("Title, slug, price, category aur kam az kam 1 image zaroori hai.");
      return;
    }

    setSaving(true);

    const payload = {
      title,
      slug,
      description,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      category,
      brand,
      stock: Number(stock),
      rating: Number(rating),
      reviewCount: Number(reviewCount),
      images,
      featured: sections.featured,
      trending: sections.trending,
      newArrival: sections.newArrival,
      bestSeller: sections.bestSeller,
      flashDeal: sections.flashDeal,
    };

    try {
      const res = await fetch(
        isEditing ? `/api/products/${initialProduct!.id}` : "/api/products",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Save nahi ho saka.");
        setSaving(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Kuch masla ho gaya, dobara koshish karein.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

      {/* Basic info */}
      <div className="glass-card p-6">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold-300">
          Basic Info
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Product Title" required>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="input"
              placeholder="e.g. Apple AirPods Pro (2nd Generation)"
            />
          </Field>

          <Field label="URL Slug" required hint="Website URL mein ye aayega — automatic banta hai">
            <input
              value={slug}
              onChange={(e) => {
                setSlug(slugify(e.target.value));
                setSlugTouched(true);
              }}
              required
              className="input font-mono text-xs"
            />
          </Field>

          <Field label="Brand">
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="input"
              placeholder="e.g. Apple, Samsung, Generic"
            />
          </Field>

          <Field label="Category" required>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as typeof category)}
              className="input"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="input resize-none"
                placeholder="Product ke baare mein bataein..."
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Pricing & stock */}
      <div className="glass-card p-6">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold-300">
          Pricing &amp; Stock
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Sale Price (Rs.)" required>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="input"
            />
          </Field>
          <Field label="Original Price (Rs.)" hint="Discount % automatic calculate hoga">
            <input
              type="number"
              min={0}
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Stock Quantity">
            <input
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Rating (0–5)">
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Review Count">
            <input
              type="number"
              min={0}
              value={reviewCount}
              onChange={(e) => setReviewCount(e.target.value)}
              className="input"
            />
          </Field>
        </div>
      </div>

      {/* Images */}
      <div className="glass-card p-6">
        <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-gold-300">
          Product Images
        </h2>

        <div className="flex flex-wrap gap-3">
          {images.map((url) => (
            <div key={url} className="group relative h-24 w-24 overflow-hidden rounded-xl border border-white/10">
              <Image src={url} alt="Product" fill sizes="96px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100"
              >
                <FiX size={13} />
              </button>
            </div>
          ))}

          <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 text-platinum-400 transition hover:border-gold-500/40 hover:text-gold-300">
            {uploading ? <FiLoader size={18} className="animate-spin" /> : <FiUploadCloud size={18} />}
            <span className="text-[10px] font-medium">{uploading ? "Uploading..." : "Add Photo"}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-platinum-500">
          Pehli image main photo hogi. Max 5MB per image.
        </p>
      </div>

      {/* Sections */}
      <div className="glass-card p-6">
        <h2 className="mb-1 font-display text-sm font-bold uppercase tracking-wider text-gold-300">
          Homepage Sections
        </h2>
        <p className="mb-4 text-xs text-platinum-500">
          Ye product website ke kin sections mein dikhega — jitne chahen utne select kar sakte hain.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {sectionOptions.map((opt) => (
            <label
              key={opt.key}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
                sections[opt.key as string]
                  ? "border-gold-500/40 bg-gold-500/[0.08]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <input
                type="checkbox"
                checked={sections[opt.key as string]}
                onChange={(e) =>
                  setSections((prev) => ({ ...prev, [opt.key as string]: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 accent-gold-500"
              />
              <div>
                <p className="text-sm font-semibold text-white">{opt.label}</p>
                <p className="text-xs text-platinum-500">{opt.hint}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
          {saving ? "Save ho raha hai..." : isEditing ? "Save Changes" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="btn-ghost"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-baseline gap-1.5 text-xs font-semibold uppercase tracking-wider text-platinum-400">
        {label}
        {required && <span className="text-gold-400">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-platinum-500">{hint}</p>}
    </div>
  );
}
