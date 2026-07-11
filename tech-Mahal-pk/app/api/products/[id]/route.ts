import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/require-admin";
import { fromDbRow, toDbRow } from "@/lib/product-mapper";

interface RouteParams {
  params: { id: string };
}

// GET /api/products/[id] — fetch one product (used to pre-fill the edit form).
export async function GET(_req: NextRequest, { params }: RouteParams) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();
  if (error || !data) {
    return NextResponse.json({ error: "Product nahi mila." }, { status: 404 });
  }
  return NextResponse.json(fromDbRow(data));
}

// PUT /api/products/[id] — update a product.
export async function PUT(req: NextRequest, { params }: RouteParams) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Recompute discount whenever price or oldPrice changes.
  if (body.price !== undefined || body.oldPrice !== undefined) {
    const { data: current } = await supabaseAdmin
      .from("products")
      .select("price, old_price")
      .eq("id", params.id)
      .maybeSingle();

    const price = body.price ?? current?.price;
    const oldPrice = body.oldPrice ?? current?.old_price;
    body.discount =
      oldPrice && price && oldPrice > price
        ? Math.round(((oldPrice - price) / oldPrice) * 100)
        : undefined;
  }

  const row = toDbRow(body);
  delete row.id;

  const { data, error } = await supabaseAdmin
    .from("products")
    .update(row)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(fromDbRow(data));
}

// DELETE /api/products/[id]
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { error } = await supabaseAdmin.from("products").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
