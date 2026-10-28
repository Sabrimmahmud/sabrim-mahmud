/** Shown for a moment during client navigation while a detail page streams in. */
export function DetailSkeleton() {
  return (
    <div className="shell pb-10 pt-12 md:pt-16" aria-busy="true" aria-label="Loading">
      <div className="hang">
        <div className="h-4 w-24 rounded bg-rule" />
        <div className="space-y-4">
          <div className="h-4 w-40 rounded bg-rule" />
          <div className="h-10 w-full max-w-[44rem] rounded bg-rule" />
          <div className="h-10 w-3/4 max-w-[34rem] rounded bg-rule" />
          <div className="h-4 w-full max-w-[30rem] rounded bg-rule" />
        </div>
      </div>
    </div>
  );
}
