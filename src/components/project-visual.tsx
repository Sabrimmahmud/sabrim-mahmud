import Image from "next/image";
import type { Project } from "@/content/types";
import { isPending } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * The picture at the top of a project card: the cover image, else the first screenshot,
 * else a schematic of the project's pipeline drawn from its documented steps.
 */
export function ProjectVisual({ project, className, sizes }: { project: Project; className?: string; sizes?: string }) {
  const shot = !isPending(project.screenshots) ? project.screenshots[0] : undefined;
  const image = project.cover ?? shot;

  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-surface", className)}>
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          sizes={sizes ?? "(min-width: 1024px) 40vw, 100vw"}
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  const steps = project.architecture.steps;
  return (
    <div
      aria-hidden
      className={cn("relative flex flex-col overflow-hidden bg-band p-5 text-band-ink sm:p-7", className)}
    >
      {/* Fine dot grid, like engineering paper. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--band-rule) 1px, transparent 1.2px)",
          backgroundSize: "18px 18px",
        }}
      />
      <ol className="relative my-auto flex flex-wrap items-center justify-center gap-2.5 py-4">
        {steps.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[0.8125rem] leading-tight shadow-[0_1px_0_rgb(255_255_255/0.04)_inset] sm:text-[0.875rem]",
                i === 0 || i === steps.length - 1
                  ? "border-band-accent/70 bg-band text-band-accent"
                  : "border-band-rule bg-[#17253f] text-band-ink",
              )}
            >
              <span className="font-serif text-[0.75rem] tabular-nums text-band-ink-2">{i + 1}</span>
              {s.label}
            </span>
          </li>
        ))}
      </ol>
      <p className="relative font-serif text-[0.9375rem] italic text-band-ink-2">{/pipeline$/i.test(project.title) ? project.title : `${project.title} pipeline`}</p>
    </div>
  );
}
