"use client";

import { useId, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import type { NewsletterContent } from "@/content/types";

type Status = "idle" | "invalid" | "unavailable";

// Deliberately simple: something@something.tld, no spaces.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email signup. Which service receives it is config, not code:
 * - `actionUrl` empty  → nothing is submitted; shows `unavailableMessage`.
 * - `actionUrl` set    → after validation the browser POSTs the form
 *   (field name "email") to that URL.
 * Messages live in an aria-live region (kept in the accessibility tree even
 * when empty, so announcements are not missed) and are tied to the input.
 */
export default function NewsletterForm({ config }: { config: NewsletterContent }) {
  const id = useId();
  const inputId = `${id}-email`;
  const messageId = `${id}-message`;
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const email = String(new FormData(event.currentTarget).get("email") ?? "");

    if (!EMAIL_PATTERN.test(email.trim())) {
      event.preventDefault();
      setStatus("invalid");
      return;
    }
    if (!config.actionUrl) {
      event.preventDefault();
      setStatus("unavailable");
      return;
    }
    setStatus("idle"); // valid and configured: let the browser submit
  }

  return (
    <form
      action={config.actionUrl || undefined}
      method="post"
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-2.5"
    >
      <label
        htmlFor={inputId}
        className="flex min-w-0 flex-1 basis-[220px] flex-col gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted"
      >
        {config.emailLabel}
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder={config.emailPlaceholder}
          aria-required="true"
          aria-invalid={status === "invalid"}
          aria-describedby={messageId}
          onChange={() => status !== "idle" && setStatus("idle")}
          className="rounded-pill border border-border-field bg-field px-[18px] py-3.5 text-[15px] font-normal normal-case tracking-normal text-foreground placeholder:text-subtle aria-[invalid=true]:border-error"
        />
      </label>
      <Button type="submit" size="field" glow={false}>
        {config.submitLabel}
      </Button>

      <p
        id={messageId}
        aria-live="polite"
        className={
          status === "invalid"
            ? "basis-full text-[14px] text-error empty:sr-only"
            : "basis-full text-[14px] text-muted empty:sr-only"
        }
      >
        {status === "invalid" && config.invalidMessage}
        {status === "unavailable" && config.unavailableMessage}
      </p>
    </form>
  );
}
