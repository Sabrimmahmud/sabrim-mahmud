"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * One sentence written the three ways it is typed in Bangladesh.
 * Bangla and Banglish tokens are aligned word for word; pointing at one
 * highlights its counterpart. The underline draw-in on load is the page's
 * single orchestrated motion, and it is skipped under reduced motion.
 */
const bangla = ["খবরটা", "পড়ে", "মনটা", "ভালো", "হয়ে", "গেল।"];
const banglish = ["khoborta", "pore", "monta", "bhalo", "hoye", "gelo."];
const english = "Reading the news put me in a good mood.";

function TokenLine({
  tokens,
  lang,
  row,
  active,
  onActive,
  className,
}: {
  tokens: string[];
  lang: string;
  row: number;
  active: number | null;
  onActive: (i: number | null) => void;
  className?: string;
}) {
  return (
    <p lang={lang} className={cn("flex flex-wrap gap-x-[0.42em] gap-y-1", className)}>
      {tokens.map((t, i) => (
        <span
          key={i}
          onPointerEnter={() => onActive(i)}
          onPointerLeave={() => onActive(null)}
          className={cn(
            "specimen-token relative cursor-default pb-[0.28em] transition-colors duration-150",
            active === i ? "text-band-accent" : active !== null && "text-band-ink/55",
          )}
          style={{ ["--d" as string]: `${row * 0.18 + i * 0.09 + 0.35}s` }}
        >
          {t}
        </span>
      ))}
    </p>
  );
}

export function ScriptSpecimen() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <figure className="relative">
      <div className="space-y-6">
        <div>
          <p className="mb-1.5 text-[0.8125rem] text-band-ink-2">Bangla</p>
          <TokenLine
            tokens={bangla}
            lang="bn"
            row={0}
            active={active}
            onActive={setActive}
            className="font-bangla text-[clamp(1.6rem,3.2vw,2.25rem)] leading-[1.35]"
          />
        </div>
        <div>
          <p className="mb-1.5 text-[0.8125rem] text-band-ink-2">Banglish</p>
          <TokenLine
            tokens={banglish}
            lang="bn-Latn"
            row={1}
            active={active}
            onActive={setActive}
            className="font-serif text-[clamp(1.45rem,2.8vw,2rem)] italic leading-[1.3]"
          />
        </div>
        <div>
          <p className="mb-1.5 text-[0.8125rem] text-band-ink-2">English</p>
          <p lang="en" className="font-serif text-[clamp(1.3rem,2.4vw,1.7rem)] leading-[1.35] text-band-ink">
            {english}
          </p>
        </div>
      </div>
      <figcaption className="mt-7 max-w-[30rem] border-t border-band-rule pt-4 text-[0.875rem] leading-relaxed text-band-ink-2">
        The same sentence as people type it in Bangladesh: Bangla script, romanized Banglish, and English. The
        sentiment platform I work on reads all three.
      </figcaption>
    </figure>
  );
}
