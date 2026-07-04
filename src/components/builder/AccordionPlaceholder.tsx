import type { ReactNode } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type AccordionPlaceholderProps = {
  step: number;
  totalSteps?: number;
  title: string;
  icon?: ReactNode;
  selectedCount?: number;
  children?: ReactNode;
}

export function AccordionPlaceholder({
  step,
  totalSteps = 4,
  title,
  icon,
  selectedCount,
  children,
}: AccordionPlaceholderProps) {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Step {step} of {totalSteps}
      </p>
      <AccordionItem
        value={String(step)}
        className="transition-all border-x-2 border-border bg-card not-last:border-b-0 data-[state=open]:border-x-0 data-[state=open]:bg-[#EDF4FF]"
      >
        <AccordionTrigger className="flex w-full items-center gap-3 px-5 py-4 text-left hover:no-underline [&_[data-slot=accordion-trigger-icon]]:hidden">
          <div className="flex-1">
            <div className="mt-1 flex items-center gap-2 text-foreground">
              {icon && (
                <span className="flex items-center text-muted-foreground">
                  {icon}
                </span>
              )}
              <h2 className="text-lg font-bold">{title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {typeof selectedCount === "number" && selectedCount > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
            )}
            <ChevronDown className="size-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-5">{children}</AccordionContent>
      </AccordionItem>
    </>
  );
}
