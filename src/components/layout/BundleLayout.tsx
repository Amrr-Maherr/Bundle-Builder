import type { ReactNode } from "react";

type BundleLayoutProps = {
  builder: ReactNode;
  sidebar: ReactNode;
}

export function BundleLayout({ builder, sidebar }: BundleLayoutProps) {
  return (
    <div className="bundle-container">
      <div className="grid gap-0 md:gap-8 pt-[31px] md:py-[49.63px] lg:grid-cols-[1fr_400px]">
        <div className="md:hidden">
          <h1 className="text-[31.88px] font-normal text-[#1F1F1F] text-center">
            Let’s get started!
          </h1>
        </div>
        <div>{builder}</div>
        <div className="min-w-0">{sidebar}</div>
      </div>
    </div>
  );
}
