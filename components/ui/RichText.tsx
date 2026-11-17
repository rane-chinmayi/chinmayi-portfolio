import { Fragment } from "react";
import type { RichTextContent } from "@/content/types";

/** Renders content with inline emphasis (`{ em }` runs become <em>). */
export default function RichText({ value }: { value: RichTextContent }) {
  return (
    <>
      {value.map((part, index) =>
        typeof part === "string" ? (
          <Fragment key={index}>{part}</Fragment>
        ) : (
          <em key={index}>{part.em}</em>
        ),
      )}
    </>
  );
}
