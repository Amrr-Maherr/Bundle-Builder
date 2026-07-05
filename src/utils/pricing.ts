import type { Variant } from "@/types";

export function hasVariantSale(variant: Variant) {
  return variant.onSale ?? false;
}

export function getSalePrice(variant: Variant) {
  return hasVariantSale(variant)
    ? (variant.salePrice as number)
    : variant.price;
}

export function lineOriginalTotal(variant: Variant, quantity: number) {
  return variant.price * quantity;
}

export function lineSaleTotal(variant: Variant, quantity: number) {
  return getSalePrice(variant) * quantity;
}

export function toMonthlyPrice(price: number) {
  return price > 50 ? price / 12 : price;
}
