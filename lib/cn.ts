type ClassValue = string | false | null | undefined;

/** Joins class names, skipping falsy values. (No dependency needed.) */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
