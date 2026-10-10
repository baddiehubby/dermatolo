import type { Localized } from "@/lib/types";

export function Bilingual({
  value,
  as: Tag = "span",
  className,
}: {
  value: Localized | string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  className?: string;
}) {
  if (typeof value === "string") {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="ltr-only">{value.en}</span>
      <span className="rtl-only">{value.ur}</span>
    </Tag>
  );
}
