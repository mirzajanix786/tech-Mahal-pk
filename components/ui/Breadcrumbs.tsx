import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-2 text-xs text-platinum-500">
        <li className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-gold-300">
            <FiHome size={12} /> Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <FiChevronRight size={12} className="flex-shrink-0 text-platinum-600" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold-300">
                {item.label}
              </Link>
            ) : (
              <span className="max-w-[180px] truncate text-platinum-300 sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
