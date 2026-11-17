import type { ReactNode } from "react";

/** 44px tile (content-box in the reference, so 46px outer) holding a 20px icon. */
export default function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-[46px] items-center justify-center rounded-xl border border-border-soft bg-fill-soft text-accent-text">
      {children}
    </span>
  );
}
