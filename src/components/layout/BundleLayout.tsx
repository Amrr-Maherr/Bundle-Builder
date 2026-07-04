import type { ReactNode } from "react";

type BundleLayoutProps = {
  builder: ReactNode;
  sidebar: ReactNode;
}

export function BundleLayout({ builder, sidebar }: BundleLayoutProps) {
  return (
    <div className="bundle-container">
      <div className="grid gap-8 py-[49.63px] lg:grid-cols-[1fr_400px]">
        <div>{builder}</div>
        <div className="min-w-0">{sidebar}</div>
      </div>
    </div>
  );
}
