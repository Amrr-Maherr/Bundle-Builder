import type { BundleItem, Product } from "@/types";
import { lineOriginalTotal, lineSaleTotal } from "@/utils/pricing";
import type { ReviewGroupData, ReviewLine, Summary } from "@/components/review/types";

function buildCategoryMap(summary?: Summary) {
  return (
    summary?.groups.reduce<Record<string, string>>((map, group) => {
      for (const category of group.categories) map[category] = group.title;
      return map;
    }, {}) ?? {}
  );
}

export function buildReviewLines(
  items: BundleItem[],
  products: Product[],
  summary?: Summary,
): ReviewLine[] {
  const categoryMap = buildCategoryMap(summary);

  return items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    if (!product || !variant) return [];

    return [
      {
        item,
        product,
        variant,
        group: categoryMap[product.category] ?? "Other",
      },
    ];
  });
}

export function buildReviewGroups(
  lines: ReviewLine[],
  summary?: Summary,
): ReviewGroupData[] {
  const titles = summary?.groups.map((group) => group.title) ?? [];

  return titles
    .map((title) => ({
      title,
      items: lines.filter((line) => line.group === title),
    }))
    .filter((group) => group.items.length > 0);
}

export function computeReviewTotals(lines: ReviewLine[]) {
  const subtotal = lines.reduce(
    (sum, line) => sum + lineOriginalTotal(line.variant, line.item.quantity),
    0,
  );
  const total = lines.reduce(
    (sum, line) => sum + lineSaleTotal(line.variant, line.item.quantity),
    0,
  );

  return {
    subtotal,
    total,
    savings: subtotal - total,
    monthlyEstimate: total / 12,
  };
}
