import StarField from "./StarField";

/**
 * Page background layers (the line grid is on <body>, see globals.css):
 * a soft accent glow at the top of the page, plus the star field.
 */
export default function Backdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-page-glow"
      />
      <StarField />
    </>
  );
}
