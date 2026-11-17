import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";
import Lead from "./Lead";

interface SectionHeaderProps {
  /** The section's id. The heading gets `${id}-title` (used by aria-labelledby). */
  id: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  className?: string;
}

/** Eyebrow + Poppins h2 + centred lead. */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={`${id}-title`}
        className={cn(
          "mb-3 text-balance font-heading text-h2 text-foreground",
          eyebrow ? "mt-4" : "mt-0",
        )}
      >
        {title}
      </h2>
      {lead && <Lead>{lead}</Lead>}
    </div>
  );
}
