import type { ReactNode } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="has-data-[state=open]:[&>.accordion-step-label]:hidden md:mb-[13px]">
      <p className="accordion-step-label mb-[5px] text-[10px] font-normal uppercase tracking-wider text-[#484848] px-[15px] md:px-0">
        Step {step} of {totalSteps}
      </p>
      <AccordionItem
        value={String(step)}
        className={cn(
          "group/accordion-item not-last:border-b-0 overflow-hidden border-0 bg-card shadow-none",
          "data-[state=open]:rounded-lg data-[state=open]:border data-[state=open]:border-primary/30 data-[state=open]:bg-secondary",
        )}
      >
        <div className="hidden border-b border-b-[#1F1F1F]! px-5 py-2.5 group-data-[state=open]/accordion-item:block">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>
        <AccordionTrigger className="flex w-full items-center gap-3 rounded-none border-x-0 border-t-0 border-b-0 bg-card px-[15px] [20px] text-left shadow-none hover:no-underline focus-visible:border-transparent focus-visible:ring-0 group-data-[state=closed]/accordion-item:border-y group-data-[state=closed]/accordion-item:border-t-[#1F1F1F]! group-data-[state=closed]/accordion-item:border-b-[#1F1F1F]! group-data-[state=open]/accordion-item:border-0 group-data-[state=open]/accordion-item:bg-secondary **:data-[slot=accordion-trigger-icon]:hidden">
          <div className="flex flex-1 items-center gap-[2.5px] text-foreground">
            {icon && (
              <span className="flex items-center text-muted-foreground">
                {icon}
              </span>
            )}
            <h2 className="md:text-[22px] text-[18px] font-normal text-[#0B0D10]">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {typeof selectedCount === "number" && selectedCount > 0 && (
              <span className="hidden text-[14px] text-primary group-data-[state=open]/accordion-item:inline">
                {selectedCount} selected
              </span>
            )}
            <ChevronUp className="hidden size-4 shrink-0 text-primary group-data-[state=open]/accordion-item:block" />
            <ChevronDown className="size-4 shrink-0 text-primary group-data-[state=open]/accordion-item:hidden" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-[15px] pb-5 group-data-[state=open]/accordion-item:bg-secondary">
          {children}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
