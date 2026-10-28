"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { primaryNav, profile, secondaryNav } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const moreId = useId();
  const mobileId = useId();

  // Close menus on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMoreOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!moreOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (moreOpen) {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (moreOpen && moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [moreOpen, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const secondaryActive = secondaryNav.some((item) => isActive(pathname, item.href));

  return (
    <>
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-rule bg-paper/92 backdrop-blur-[6px] supports-[backdrop-filter]:bg-paper/85"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-[1.3rem] leading-none tracking-[-0.01em] text-ink"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.9375rem] transition-colors",
                isActive(pathname, item.href)
                  ? "bg-sage-wash text-ink"
                  : "text-ink-2 hover:text-ink hover:bg-sage-wash/60",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              ref={moreButtonRef}
              type="button"
              aria-expanded={moreOpen}
              aria-controls={moreId}
              onClick={() => setMoreOpen((o) => !o)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.9375rem] transition-colors",
                secondaryActive || moreOpen ? "bg-sage-wash text-ink" : "text-ink-2 hover:text-ink hover:bg-sage-wash/60",
              )}
            >
              More
              <ChevronDown
                aria-hidden
                className={cn("size-4 transition-transform", moreOpen && "rotate-180")}
                strokeWidth={1.6}
              />
            </button>
            {moreOpen && (
              <div
                id={moreId}
                className="absolute right-0 top-[calc(100%+0.6rem)] w-80 rounded-lg border border-rule bg-surface p-2 shadow-[0_12px_32px_-12px_rgb(19_33_58/0.28)]"
              >
                <ul>
                  {secondaryNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className="group grid grid-cols-[6.5rem_1fr] items-baseline gap-3 rounded-md px-3 py-2 hover:bg-sage-wash"
                      >
                        <span className="text-[0.9375rem] text-ink group-aria-[current=page]:font-semibold">
                          {item.label}
                        </span>
                        <span className="text-[0.8125rem] leading-snug text-ink-3">{item.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={mobileButtonRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink-2 hover:bg-sage-wash hover:text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X aria-hidden className="size-5" strokeWidth={1.6} />
            ) : (
              <Menu aria-hidden className="size-5" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

    </header>
    {/* Outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      {mobileOpen && (
        <nav
          id={mobileId}
          aria-label="Main"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-rule bg-paper lg:hidden"
        >
          <div className="shell py-6">
            <ul className="divide-y divide-rule border-y border-rule">
              {[{ href: "/", label: "Home", description: "Overview" }, ...primaryNav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <span className="font-serif text-step-2 text-ink group-aria-[current=page]:text-accent">
                      {item.label}
                    </span>
                    <span className="text-right text-[0.8125rem] text-ink-3">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
