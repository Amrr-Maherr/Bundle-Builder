import type { Product } from "@/types";

export function findVariant(product: Product, variantId: string | null) {
  const id = variantId ?? product.variants[0]?.id;
  return product.variants.find((v) => v.id === id) ?? product.variants[0];
}
