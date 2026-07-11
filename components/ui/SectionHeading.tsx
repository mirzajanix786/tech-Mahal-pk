import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p className={cn("eyebrow", align === "center" && "justify-center")}>{eyebrow}</p>
      <h2 className="section-title">
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-platinum-400 text-[15px] sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
