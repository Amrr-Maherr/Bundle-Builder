export function ProductCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col rounded-[16px] border-2 border-[#e2dbf6] bg-card p-4 md:flex-row md:gap-5 md:p-5">
      <div className="relative flex w-full shrink-0 items-center justify-center py-1 md:w-[101px] md:min-h-[137px] md:py-0">
        <div className="h-[140px] w-full max-w-[220px] rounded-lg bg-muted md:h-[137px] md:w-[101px] md:max-w-[101px] md:rounded-[5px]" />
      </div>

      <div className="mt-3 flex min-w-0 flex-1 flex-col md:mt-0">
        <div className="h-5 w-3/4 rounded bg-muted" />

        <div className="mt-2 space-y-1.5 md:space-y-0">
          <div className="h-3 w-full rounded bg-muted" />
          <div className="h-3 w-2/3 rounded bg-muted md:hidden" />
          <div className="mt-1 hidden h-3 w-20 rounded bg-muted md:block" />
        </div>

        <div className="mt-3 flex gap-2">
          <div className="h-8 w-[72px] rounded-lg bg-muted" />
          <div className="h-8 w-[72px] rounded-lg bg-muted" />
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-4 md:items-end">
          <div className="flex items-center gap-3">
            <div className="size-5 rounded bg-muted" />
            <div className="h-5 w-4 rounded bg-muted" />
            <div className="size-5 rounded bg-muted" />
          </div>
          <div className="flex flex-row items-baseline gap-1 md:flex-col md:items-end md:gap-1">
            <div className="h-3.5 w-14 rounded bg-muted" />
            <div className="h-5 w-16 rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
