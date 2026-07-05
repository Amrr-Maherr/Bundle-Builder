import type { BundleItem, Product, Variant } from "@/types";

export type SummaryGroup = {
  id: string;
  title: string;
  categories: string[];
};

export type Summary = {
  groups: SummaryGroup[];
};

export type ReviewLine = {
  item: BundleItem;
  product: Product;
  variant: Variant;
  group: string;
};

export type ReviewGroupData = {
  title: string;
  items: ReviewLine[];
};
