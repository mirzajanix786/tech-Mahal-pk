import { FiShield, FiDollarSign, FiZap, FiAward, FiPackage, FiSmartphone } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/constants/site";

const reasons = [
  {
    icon: FiShield,
    title: "Premium Quality",
    body: "We focus on quality gadgets and accessories that are reliable, durable, and worth your money.",
  },
  {
    icon: FiDollarSign,
    title: "Best Prices",
    body: "Competitive pricing so you get the best value without ever compromising on quality.",
  },
  {
    icon: FiZap,
    title: "Fast Response",
    body: "Quick, helpful support on WhatsApp so your shopping experience stays smooth and easy.",
  },
  {
    icon: FiAward,
    title: "Trusted By Customers",
    body: "200+ happy customers and growing — through trust, repeat orders, and honest service.",
  },
  {
    icon: FiPackage,
    title: "Careful Packaging",
    body: "Every order is packed with care so your products arrive safely, every single time.",
  },
  {
    icon: FiSmartphone,
    title: "Latest Accessories",
    body: "A curated catalog of useful, trending tech essentials people actually reach for.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-20 sm:py-28">
      <div className="container-max">
        <SectionHeading
          eyebrow="Why Shop With Us"
          title={`Why Choose ${siteConfig.shortName}`}
          align="center"
          description="Built for customers who want quality, trust, and convenience — every single order."
          className="mx-auto text-center"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={Math.min(i, 5) * 0.06}>
              <div className="glass-card h-full p-6 transition-colors duration-300 hover:border-gold-500/30 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400">
                  <r.icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold uppercase tracking-wide text-white">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-platinum-400">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
