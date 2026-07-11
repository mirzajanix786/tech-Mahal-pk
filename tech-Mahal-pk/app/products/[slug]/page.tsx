import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiMessageCircle, FiCheckCircle } from "react-icons/fi";
import { productService, categoryService } from "@/services/productService";
import { siteConfig } from "@/constants/site";
import {
  formatPrice,
  getDiscountPercent,
  stockLabel,
  buildProductWhatsAppLink,
  getProductSpecs,
  getProductFeatures,
} from "@/lib/utils";
import ProductGallery from "@/components/product/ProductGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import StarRating from "@/components/ui/StarRating";
import ProductCarousel from "@/components/product/ProductCarousel";
import AddToCartActions from "@/components/product/AddToCartActions";

interface ProductPageProps {
  params: { slug: string };
}

export const revalidate = 0;

export async function generateStaticParams() {
  const products = await productService.getAll();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await productService.getBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  const title = `${product.title} | ${siteConfig.shortName}`;
  const description = product.description.slice(0, 155);

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: product.images[0], width: 900, height: 900, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productService.getBySlug(params.slug);
  if (!product) notFound();

  const category = categoryService.getBySlug(product.category);
  const discount = getDiscountPercent(product);
  const stock = stockLabel(product.stock);
  const specs = getProductSpecs(product);
  const features = getProductFeatures(product);
  const related = await productService.getRelated(product, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/products/${product.slug}`,
    },
    aggregateRating: product.reviewCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }
      : undefined,
  };

  return (
    <div className="pb-20 pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="container-max">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/#categories" },
            ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} title={product.title} />

          <div className="flex flex-col">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-gold-400">
              {product.brand} · {product.category.replace("-", " ")}
            </p>
            <h1 className="font-display text-2xl font-semibold leading-tight text-white sm:text-3xl">
              {product.title}
            </h1>

            <div className="mt-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} showValue />
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-platinum-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {discount && <span className="chip-sale">-{discount}% OFF</span>}
            </div>

            <p
              className={`mt-3 text-xs font-semibold uppercase tracking-wider ${
                stock.tone === "out"
                  ? "text-platinum-500"
                  : stock.tone === "low"
                  ? "text-amber-400"
                  : "text-signal-400"
              }`}
            >
              {stock.tone === "in" && <FiCheckCircle className="mr-1.5 inline" size={13} />}
              {stock.label}
            </p>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-platinum-300">
              {product.description}
            </p>

            {/* Features */}
            <ul className="mt-6 flex flex-col gap-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-platinum-300">
                  <FiCheckCircle className="mt-0.5 flex-shrink-0 text-gold-400" size={15} />
                  <span className="min-w-0">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AddToCartActions product={product} />
              <a
                href={buildProductWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1"
              >
                <FiMessageCircle size={15} /> Order on WhatsApp
              </a>
            </div>

            {/* Specifications */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
                Specifications
              </h2>
              <dl className="divide-y divide-white/10">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-platinum-500">{spec.label}</dt>
                    <dd className="max-w-[60%] text-right text-platinum-200">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="section-title">
              You May Also <span className="accent">Like.</span>
            </h2>
            <div className="mt-8">
              <ProductCarousel products={related} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
