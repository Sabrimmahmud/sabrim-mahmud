"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="shell py-20 md:py-28">
      <div className="hang">
        <p className="hang-label">Error</p>
        <div>
          <h1 className="text-step-4">This page failed to load</h1>
          <p className="mt-5 max-w-[34rem] text-step-1 text-ink-2">
            Something went wrong while showing this page. Try loading it again, or go back to the home page.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => retry()}
              className="rounded-full bg-ink px-4 py-2 text-[0.9375rem] text-paper hover:bg-accent"
            >
              Try again
            </button>
            <Link href="/" className="prose-link">
              Go to the home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
