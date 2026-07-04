export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-[15px] border-2 border-[#e2dbf6] bg-card px-[11px] py-[29.35px] animate-pulse">
      <div className="relative mb-3 flex w-[202.6px] h-[117.3944px] items-center justify-center">
        <div className="size-full rounded-lg bg-muted" />
      </div>

      <div className="h-5 w-3/4 rounded bg-muted" />

      <div className="mt-[8px] space-y-1.5">
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-1/3 rounded bg-muted" />
      </div>

      <div className="mt-3 flex gap-2">
        <div className="h-8 w-16 rounded-lg bg-muted" />
        <div className="h-8 w-16 rounded-lg bg-muted" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-[10px]">
        <div className="flex items-center gap-1">
          <div className="size-7 rounded-lg bg-muted" />
          <div className="h-6 w-7 rounded bg-muted" />
          <div className="size-7 rounded-lg bg-muted" />
        </div>
        <div className="h-5 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}
