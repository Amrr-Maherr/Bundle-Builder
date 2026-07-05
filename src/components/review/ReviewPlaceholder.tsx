import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerBundle } from "@/hooks/useServerBundle";
import { useProducts } from "@/hooks/useProducts";
import { useSummary } from "@/hooks/useSummary";
import { submitBundle } from "@/lib/api";
import {
  buildReviewGroups,
  buildReviewLines,
  computeReviewTotals,
} from "@/lib/review";
import { ErrorState } from "@/components/shared/ErrorState";
import { ReviewFooter } from "./ReviewFooter";
import { ReviewGroupsSection } from "./ReviewGroupsSection";
import { ReviewSummarySkeleton } from "./ReviewSummarySkeleton";

export function ReviewPlaceholder() {
  const { state, updateQuantity } = useServerBundle();
  const { data: products = [] } = useProducts();
  const { data: summary, isLoading, isError, error, refetch } = useSummary();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () =>
      submitBundle({
        items: state.items,
        submittedAt: new Date().toISOString(),
      }),
    onSuccess: () => {
      toast.success("Bundle saved!");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
    onError: () => {
      toast.error("Failed to save bundle");
    },
  });

  const lines = buildReviewLines(state.items, products, summary);
  const groups = buildReviewGroups(lines, summary);
  const totals = computeReviewTotals(lines);
  const planLine = lines.find((line) => line.product.category === "plan");

  if (isError) {
    return (
      <ErrorState
        message={(error as Error)?.message ?? "Failed to load summary"}
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return <ReviewSummarySkeleton />;
  }

  return (
    <div className="rounded-[10px] bg-[#EDF4FF]">
      <div className="px-[15px] pb-[5px] pt-[15px] md:pt-[20px]">
        <p className="text-[#484848]">Review</p>
      </div>
      <div className="flex flex-col items-center justify-center px-5 pb-[31px] pt-5">
        <ReviewGroupsSection
          groups={groups}
          onQuantityChange={updateQuantity}
        />
        <ReviewFooter
          planLine={planLine}
          {...totals}
          isSaving={saveMutation.isPending}
          isSaved={saveMutation.isSuccess}
          onSave={() => saveMutation.mutate()}
        />
      </div>
    </div>
  );
}
