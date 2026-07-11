import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/require-admin";
import { fromDbRow, toDbRow } from "@/lib/product-mapper";

// GET /api/products — used by the admin product list (shows everything,
// including out-of-stock / non-featured products the public storefront
// wouldn't fetch).
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.map(fromDbRow));
}

// POST /api/products — create a new product.
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.title || !body.slug || !body.price || !body.category) {
    return NextResponse.json(
      { error: "Title, slug, price aur category zaroori hain." },
      { status: 400 }
    );
  }

  // Generate a simple unique id if none provided.
  if (!body.id) {
    body.id = `${body.category}-${Date.now().toString(36)}`;
  }

  const discount =
    body.oldPrice && body.oldPrice > body.price
      ? Math.round(((body.oldPrice - body.price) / body.oldPrice) * 100)
      : undefined;

  const row = toDbRow({ ...body, discount });

  const { data: existing } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("slug", body.slug)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "Ye slug pehle se istemal ho raha hai — koi doosra slug likhein." },
      { status: 409 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(row)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(fromDbRow(data));
}
