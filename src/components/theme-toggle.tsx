"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function currentTheme(): Theme {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", callback);
  };
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable in private windows; the choice still applies to this page.
  }
  listeners.forEach((l) => l());
}

/** Inline script for <head>: applies a saved theme before first paint. */
export const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function ThemeToggle({ className }: { className?: string }) {
  // Server render has no theme; null keeps the label neutral until hydration.
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = theme === null ? "Change theme" : `Switch to ${next} theme`;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={
        "inline-flex size-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-sage-wash hover:text-ink " +
        (className ?? "")
      }
    >
      {theme === "dark" ? (
        <Sun aria-hidden className="size-[1.1rem]" strokeWidth={1.6} />
      ) : (
        <Moon aria-hidden className="size-[1.1rem]" strokeWidth={1.6} />
      )}
    </button>
  );
}
