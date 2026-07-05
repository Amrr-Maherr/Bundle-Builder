import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerBundle } from "@/hooks/useServerBundle";
import { useProducts } from "@/hooks/useProducts";
import { fetchSummary, submitBundle } from "@/lib/api";
import { ErrorState } from "@/components/shared/ErrorState";
import { ReviewFooter } from "./ReviewFooter";
import { ReviewGroupsSection } from "./ReviewGroupsSection";
import { ReviewSummarySkeleton } from "./ReviewSummarySkeleton";
import type { Summary } from "./types";

export function ReviewPlaceholder() {
  const { state, updateQuantity } = useServerBundle();
  const { data: products = [] } = useProducts();
  const {
    data: summary,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Summary>({
    queryKey: ["summary"],
    queryFn: fetchSummary,
  });

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

  const categoryGroup =
    summary?.groups.reduce<Record<string, string>>((map, g) => {
      for (const cat of g.categories) map[cat] = g.title;
      return map;
    }, {}) ?? {};

  const lines = state.items
    .map((item) => {
      const product = products.find(
        (p: { id: string }) => p.id === item.productId,
      );
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) return null;
      return {
        item,
        product,
        variant,
        group: categoryGroup[product.category] ?? "Other",
      };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.variant.price * l.item.quantity,
    0,
  );
  const total = lines.reduce(
    (sum, l) =>
      sum + (l.variant.salePrice ?? l.variant.price) * l.item.quantity,
    0,
  );
  const savings = subtotal - total;
  const monthlyEstimate = total / 12;

  const groupTitles = summary?.groups.map((g) => g.title) ?? [];
  const groups = groupTitles
    .map((title) => ({
      title,
      items: lines.filter((l) => l.group === title),
    }))
    .filter((group) => group.items.length > 0);

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
          subtotal={subtotal}
          total={total}
          savings={savings}
          monthlyEstimate={monthlyEstimate}
          isSaving={saveMutation.isPending}
          isSaved={saveMutation.isSuccess}
          onSave={() => saveMutation.mutate()}
        />
      </div>
    </div>
  );
}
