import { ReviewActions } from "./ReviewActions";
import { ReviewMobilePlan } from "./ReviewMobilePlan";
import { ReviewShipping } from "./ReviewShipping";
import { ReviewTotals } from "./ReviewTotals";
import type { ReviewLine } from "./types";

type ReviewFooterProps = {
  planLine?: ReviewLine;
  subtotal: number;
  total: number;
  savings: number;
  monthlyEstimate: number;
  isSaving: boolean;
  isSaved: boolean;
  onSave: () => void;
};

export function ReviewFooter({
  planLine,
  subtotal,
  total,
  savings,
  monthlyEstimate,
  isSaving,
  isSaved,
  onSave,
}: ReviewFooterProps) {
  return (
    <div className="flex w-full flex-col">
      {planLine && <ReviewMobilePlan planLine={planLine} />}
      <ReviewShipping />
      <ReviewTotals
        subtotal={subtotal}
        total={total}
        savings={savings}
        monthlyEstimate={monthlyEstimate}
      />
      <ReviewActions
        total={total}
        isSaving={isSaving}
        isSaved={isSaved}
        onSave={onSave}
      />
    </div>
  );
}
