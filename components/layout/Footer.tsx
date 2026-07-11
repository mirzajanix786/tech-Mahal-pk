import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { siteConfig, navLinks, socialLinks } from "@/constants/site";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-onyx-900 pt-16 sm:pt-20">
      <div className="container-max grid grid-cols-1 gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 font-display text-sm font-bold text-onyx-950">
              TM
            </span>
            <span className="font-display text-[15px] font-semibold uppercase tracking-wide text-white">
              {siteConfig.shortName}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-platinum-400">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: FaFacebookF, href: socialLinks.facebook, label: "Facebook" },
              { icon: FaInstagram, href: socialLinks.instagram, label: "Instagram" },
              { icon: FaTiktok, href: socialLinks.tiktok, label: "TikTok" },
              { icon: FaWhatsapp, href: socialLinks.whatsapp, label: "WhatsApp" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-platinum-400 transition-colors hover:border-gold-500/40 hover:text-gold-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-platinum-500">
            Explore
          </h4>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-platinum-400 transition-colors hover:text-gold-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-platinum-500">
            Categories
          </h4>
          <ul className="flex flex-col gap-3">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-sm text-platinum-400 transition-colors hover:text-gold-300"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="contact">
          <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-platinum-500">
            Get In Touch
          </h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 flex-shrink-0 text-gold-400" size={15} />
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-platinum-400 hover:text-gold-300"
              >
                {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 flex-shrink-0 text-gold-400" size={15} />
              <a
                href="mailto:orders@techmahalpk.com"
                className="text-sm text-platinum-400 hover:text-gold-300"
              >
                orders@techmahalpk.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 flex-shrink-0 text-gold-400" size={15} />
              <span className="text-sm text-platinum-400">
                College Road, Township, Lahore, Pakistan
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-max flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-platinum-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-platinum-500">
            Cash on Delivery · Easypaisa/JazzCash · Bank Transfer
          </p>
        </div>
      </div>
    </footer>
  );
}
