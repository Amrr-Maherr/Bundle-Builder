export type Variant = {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  image?: string;
  onSale?: boolean;
  discountPercent?: number;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  learnMoreUrl?: string;
  variants: Variant[];
  minQuantity: number;
  maxQuantity: number;
}

export type BundleItem = {
  productId: string;
  variantId: string;
  quantity: number;
}

export type BundleState = {
  currentStep: number;
  items: BundleItem[];
}
