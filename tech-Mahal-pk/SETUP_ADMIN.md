# Tech Mahal PK — Admin Panel Setup (Roman Urdu Guide)

Ye guide follow karke apna admin panel live kar sakte hain. Total time: ~20-25 minutes.

## Step 1 — Supabase account banayein (free)

1. https://supabase.com pe jaayein → "Start your project" → GitHub se sign up karein
2. "New Project" → koi bhi naam de dein (e.g. `tech-mahal-pk`)
3. Database password set karein (kahin save kar lein) → region "Southeast Asia (Singapore)" choose karein (Pakistan se sabse close) → "Create new project"
4. ~2 minute wait karein jab tak project ready ho

## Step 2 — Database table banayein

1. Supabase dashboard mein left sidebar se **SQL Editor** kholein
2. `supabase/schema.sql` file ka pura content copy karein aur paste kar dein
3. **Run** button dabayein — ye `products` table aur image storage bucket dono bana dega

## Step 3 — API keys copy karein

1. Left sidebar → **Project Settings** (gear icon) → **API**
2. Ye 3 cheezein copy kar lein:
   - `Project URL` → ye `NEXT_PUBLIC_SUPABASE_URL` hai
   - `anon public` key → ye `NEXT_PUBLIC_SUPABASE_ANON_KEY` hai
   - `service_role` key → ye `SUPABASE_SERVICE_ROLE_KEY` hai (⚠️ ye secret hai, kisi ko na dein)

## Step 4 — Local .env.local banayein (apne existing products upload karne ke liye)

1. Project folder mein `.env.local.example` ko copy karke `.env.local` naam se save karein
2. Upar wali 3 keys paste kar dein
3. `ADMIN_PASSWORD` mein apna admin password choose karein
4. `ADMIN_SESSION_SECRET` mein koi bhi lamba random text likh dein

## Step 5 — Apne 51 existing products database mein upload karein

Terminal mein project folder ke andar:

```bash
npm install
npm run seed
```

Ye `data/products.ts` ke sab 51 products Supabase database mein daal dega. "✅ 51 products successfully seeded" message aane ka wait karein.

## Step 6 — Vercel pe environment variables add karein

1. Vercel dashboard → apna `tech-mahal-pk` project kholein → **Settings** → **Environment Variables**
2. Yahi 5 variables add karein jo `.env.local` mein hain (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD, ADMIN_SESSION_SECRET)
3. Har ek ke liye "Production", "Preview", "Development" teeno check kar dein

## Step 7 — Naya code GitHub pe push karein

```bash
git add .
git commit -m "Add admin panel with Supabase database"
git push
```

Vercel automatically naya build shuru kar dega (2-3 minute lagega).

## Step 8 — Admin panel use karein

Deploy hone ke baad:

- **Admin login:** `https://tech-mahal-pk.vercel.app/admin/login`
- Password wahi jo aapne `ADMIN_PASSWORD` mein set kiya tha
- Yahan se: naya product add karein, photo upload karein, price/stock update karein, aur decide karein ke product kin sections mein dikhega (Flash Deals, New Arrivals, Trending, Featured, Best Sellers)

Dost ko bhi yehi URL aur password de dein — wo bhi wahin se login karke products manage kar sakega. Do logon ke liye alag account nahi banaya (ek hi shared password hai) — agar aage chal ke alag-alag logins chahiye hon to bata dena, wo bhi add ho sakta hai.

## Important

- `SUPABASE_SERVICE_ROLE_KEY` kabhi bhi kisi client-side code ya public repo mein na daalein — sirf Vercel environment variables mein rahe
- Purani `data/products.ts` file ab sirf backup ke tor pe hai — website ab live Supabase database se data leti hai
