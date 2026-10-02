import Image from "next/image";

type ProductVisualProps = {
  src: string;
  alt: string;
  priority?: boolean;
  float?: boolean;
  sweep?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
};

export function ProductVisual({
  src,
  alt,
  priority = false,
  float = false,
  sweep = false,
  sizes = "(min-width: 768px) 480px, 88vw",
  className = "",
  imageClassName = "object-contain",
}: ProductVisualProps) {
  return (
    <figure className={`product-frame ${sweep ? "gold-sweep" : ""} ${className}`}>
      <div className={`absolute inset-0 ${float ? "bottle-float" : ""}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={imageClassName} />
      </div>
    </figure>
  );
}
