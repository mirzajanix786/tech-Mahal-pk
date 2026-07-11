"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiGrid, FiBox, FiPlusCircle, FiLogOut, FiExternalLink } from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { href: "/admin/products", label: "Products", icon: FiBox },
  { href: "/admin/products/new", label: "Add Product", icon: FiPlusCircle },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-shrink-0 flex-col border-white/10 bg-onyx-900/60 sm:h-screen sm:w-60 sm:border-r sm:sticky sm:top-0">
      <div className="border-b border-white/10 p-5">
        <p className="font-display text-lg font-bold text-white">
          Tech Mahal <span className="text-gold-300">Admin</span>
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-gold-500/15 text-gold-300"
                  : "text-platinum-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-platinum-400 transition hover:bg-white/[0.04] hover:text-white"
        >
          <FiExternalLink size={16} />
          View Website
        </a>
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-platinum-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
