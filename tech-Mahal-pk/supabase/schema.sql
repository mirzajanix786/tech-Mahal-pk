-- Run this once in Supabase → SQL Editor → New Query → paste → Run.

create table if not exists products (
  id text primary key,
  slug text unique not null,
  title text not null,
  description text default '',
  price numeric not null,
  old_price numeric,
  category text not null,
  brand text default '',
  rating numeric default 0,
  review_count integer default 0,
  stock integer default 0,
  images text[] not null default '{}',
  featured boolean default false,
  trending boolean default false,
  new_arrival boolean default false,
  best_seller boolean default false,
  flash_deal boolean default false,
  discount integer,
  tags text[] default '{}',
  specifications jsonb,
  features text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Keep updated_at fresh on every edit.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
before update on products
for each row execute procedure set_updated_at();

-- Row Level Security: anyone can READ products (needed for the public
-- storefront), but only the service-role key (used server-side in the
-- admin API routes) can insert/update/delete.
alter table products enable row level security;

drop policy if exists "Public read access" on products;
create policy "Public read access"
  on products for select
  using (true);

-- Helpful index for category pages.
create index if not exists products_category_idx on products (category);

-- Storage bucket for product photos uploaded from the admin panel.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');
