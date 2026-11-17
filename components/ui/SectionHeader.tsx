import { Fragment } from "react";
import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";
import Lead from "./Lead";

interface SectionHeaderProps {
  /** The section's id. The heading gets `${id}-title` (used by aria-labelledby). */
  id: string;
  eyebrow?: string;
  /** A "\n" in the title is a line break from `sm` up (a space on phones). */
  title: string;
  lead?: string;
  /** "large" is the closing call-to-action heading. */
  size?: "default" | "large";
  className?: string;
}

/** Eyebrow + Poppins h2 + centred lead. */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  lead,
  size = "default",
  className,
}: SectionHeaderProps) {
  const lines = title.split("\n");

  return (
    <div className={cn("text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={`${id}-title`}
        className={cn(
          "mb-3 mt-4 text-balance font-heading text-foreground",
          size === "large" ? "text-h2-xl" : "text-h2",
        )}
      >
        {lines.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && (
              <>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
              </>
            )}
            {line}
          </Fragment>
        ))}
      </h2>
      {lead && <Lead>{lead}</Lead>}
    </div>
  );
}
