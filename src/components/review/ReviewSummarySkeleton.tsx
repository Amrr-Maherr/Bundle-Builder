export function ReviewSummarySkeleton() {
  return (
    <div className="rounded-2xl bg-[#f6f5fb] p-5">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-48 rounded bg-muted" />
        <div className="h-4 w-96 rounded bg-muted" />
        <div className="h-32 rounded-lg bg-muted" />
      </div>
    </div>
  );
}
