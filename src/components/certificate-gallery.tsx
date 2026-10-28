"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Achievement, AchievementCategory, CertificateImage } from "@/content/types";
import { FilterChips, ResultCount } from "./filter-controls";

type Open = { images: CertificateImage[]; index: number; title: string } | null;

function Lightbox({ open, onClose, onMove }: { open: Open; onClose: () => void; onMove: (d: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onMove]);

  const image = open?.images[open.index];
  const many = (open?.images.length ?? 0) > 1;

  return (
    <dialog
      ref={ref}
      aria-label={image ? `${open?.title}: ${image.caption}` : "Certificate viewer"}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto max-h-[94dvh] w-[min(64rem,94vw)] overflow-visible bg-transparent p-0 text-band-ink backdrop:bg-[rgb(8_16_31/0.86)]"
    >
      {open && image && (
        <motion.div
          key={image.src}
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col"
        >
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-[0.9375rem]">
              {open.title}
              {many && (
                <span className="ml-2 text-band-ink-2 tabular-nums">
                  {open.index + 1} of {open.images.length}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Close viewer"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X aria-hidden className="size-5" strokeWidth={1.6} />
            </button>
          </div>
          <div className="relative">
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="94vw"
              className="mx-auto max-h-[76dvh] w-auto rounded-sm object-contain"
            />
            {many && (
              <>
                <button
                  type="button"
                  onClick={() => onMove(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(8_16_31/0.7)] hover:bg-[rgb(8_16_31/0.9)]"
                >
                  <ChevronLeft aria-hidden className="size-5" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  onClick={() => onMove(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(8_16_31/0.7)] hover:bg-[rgb(8_16_31/0.9)]"
                >
                  <ChevronRight aria-hidden className="size-5" strokeWidth={1.6} />
                </button>
              </>
            )}
          </div>
          <p className="mt-3 text-[0.875rem] text-band-ink-2">{image.caption}</p>
        </motion.div>
      )}
    </dialog>
  );
}

export function CertificateGallery({ achievements }: { achievements: Achievement[] }) {
  const [category, setCategory] = useState<AchievementCategory | "all">("all");
  const [open, setOpen] = useState<Open>(null);
  const opener = useRef<HTMLElement | null>(null);

  const categories = [...new Set(achievements.map((a) => a.category))];
  const filtered = achievements.filter((a) => category === "all" || a.category === category);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  const move = useCallback((d: number) => {
    setOpen((o) => (o ? { ...o, index: (o.index + d + o.images.length) % o.images.length } : o));
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-rule pb-6">
        <FilterChips
          label="Type"
          value={category}
          onChange={setCategory}
          options={[
            { value: "all", label: "All" },
            ...categories.map((c) => ({
              value: c,
              label: c === "Conference" ? "Conferences" : "Competitions",
              count: achievements.filter((a) => a.category === c).length,
            })),
          ]}
        />
        <ResultCount shown={filtered.length} total={achievements.length} noun={["entry", "entries"]} />
      </div>

      <div className="divide-y divide-rule">
        {filtered.map((a) => (
          <article key={a.slug} id={a.slug} className="scroll-mt-24 py-10">
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-8">
              <div>
                <p className="text-[0.875rem] text-ink-3">{a.category}</p>
                <h2 className="mt-1 text-step-3 leading-[1.1]">{a.title}</h2>
                <p className="mt-3 inline-flex rounded-full border border-sage px-3 py-0.5 text-[0.875rem] font-medium text-ink">
                  {a.outcome}
                </p>
              </div>
              <p className="text-[0.875rem] text-ink-3 md:pt-7 md:text-right">{a.date}</p>
            </div>
            <dl className="mt-5 grid max-w-[44rem] gap-x-6 gap-y-1.5 text-[0.9375rem] sm:grid-cols-[6.5rem_minmax(0,1fr)]">
              <dt className="text-ink-3">Event</dt>
              <dd className="text-ink-2">{a.event}</dd>
              <dt className="text-ink-3">Organizer</dt>
              <dd className="text-ink-2">{a.organizer}</dd>
            </dl>
            <p className="mt-4 max-w-[40rem] text-ink-2">{a.description}</p>
            {a.related && (
              <p className="mt-2">
                <Link href={a.related.href} className="prose-link">
                  {a.related.label}
                </Link>
              </p>
            )}
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {a.images.map((img, i) => (
                <li key={img.src} className={i === 0 && a.images.length >= 4 ? "col-span-2 sm:row-span-2" : undefined}>
                  <figure>
                    <button
                      type="button"
                      onClick={(e) => {
                        opener.current = e.currentTarget;
                        setOpen({ images: a.images, index: i, title: a.title });
                      }}
                      className="group relative block h-full w-full overflow-hidden rounded-sm border border-rule bg-surface"
                      aria-label={`Enlarge: ${img.caption}`}
                    >
                      <Image
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        alt={img.alt}
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
                          i === 0 && a.images.length >= 4 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-[4/3]"
                        }`}
                      />
                      <span className="absolute bottom-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-[rgb(19_33_58/0.75)] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        <Maximize2 aria-hidden className="size-3.5" strokeWidth={1.8} />
                      </span>
                    </button>
                    <figcaption className="mt-2 text-[0.8125rem] leading-snug text-ink-3">{img.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <Lightbox open={open} onClose={close} onMove={move} />
    </div>
  );
}
