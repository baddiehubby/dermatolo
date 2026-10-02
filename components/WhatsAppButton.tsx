import { WhatsAppIcon } from "./Icons";

type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function WhatsAppButton({ href, children, className = "" }: WhatsAppButtonProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`wa-btn ${className}`}>
      <WhatsAppIcon />
      {children}
    </a>
  );
}
