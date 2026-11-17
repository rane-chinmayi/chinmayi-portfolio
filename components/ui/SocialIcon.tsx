import { Mail } from "lucide-react";

interface SocialIconProps {
  kind: "linkedin" | "email";
  className?: string;
}

/**
 * lucide-react 1.x no longer ships brand icons, so LinkedIn is an inline SVG
 * in lucide's outline style (same 2px stroke as the Mail icon next to it).
 * Everything else comes from lucide-react.
 */
export default function SocialIcon({ kind, className }: SocialIconProps) {
  if (kind === "email") {
    return <Mail className={className} aria-hidden="true" />;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
