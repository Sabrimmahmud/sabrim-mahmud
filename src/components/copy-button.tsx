"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "failed";

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Fallback for browsers without the async clipboard API.
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  if (!ok) throw new Error("Copy command was rejected");
}

export function CopyButton({
  text,
  label,
  copiedLabel = "Copied",
  className,
}: {
  text: string;
  /** Visible label, e.g. "Copy DOI". */
  label: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onCopy() {
    try {
      await writeClipboard(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2200);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-rule-strong px-3 py-1 text-[0.8125rem] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink",
        status === "copied" && "border-accent text-accent",
        className,
      )}
    >
      {status === "copied" ? (
        <Check aria-hidden className="size-3.5" strokeWidth={1.8} />
      ) : (
        <Copy aria-hidden className="size-3.5" strokeWidth={1.6} />
      )}
      <span>{status === "copied" ? copiedLabel : status === "failed" ? "Copy failed, select the text instead" : label}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? `${copiedLabel} to clipboard` : status === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}
