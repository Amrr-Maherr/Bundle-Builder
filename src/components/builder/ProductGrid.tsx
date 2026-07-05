import { useState } from "react";
import toast from "react-hot-toast";
import type { BundleItem, Product, QuantityChangeHandler } from "@/types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  bundleItems: BundleItem[];
  addItem: (productId: string, variantId: string) => boolean;
  updateQuantity: QuantityChangeHandler;
};

export const productGridClassName =
  "grid grid-cols-1 gap-[15px] pt-[5px] md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:w-[calc(50%-7.5px)] md:[&>*:last-child:nth-child(odd)]:justify-self-center";

function getProductBundleItems(bundleItems: BundleItem[], productId: string) {
  return bundleItems.filter((item) => item.productId === productId);
}

export function ProductGrid({
  products,
  bundleItems,
  addItem,
  updateQuantity,
}: ProductGridProps) {
  const [activeVariant, setActiveVariant] = useState<Record<string, string>>(
    {},
  );

  return (
    <div className={productGridClassName}>
      {products.map((product) => {
        const productItems = getProductBundleItems(bundleItems, product.id);
        const activeId =
          activeVariant[product.id] ?? productItems[0]?.variantId ?? null;
        const quantity =
          productItems.find((item) => item.variantId === activeId)?.quantity ??
          0;

        const resolveVariantId = () =>
          activeId ??
          (product.variants.length === 1 ? product.variants[0].id : null);

        return (
          <ProductCard
            key={product.id}
            product={product}
            selectedVariantId={activeId}
            quantity={quantity}
            onVariantSelect={(variantId) => {
              setActiveVariant((prev) => ({
                ...prev,
                [product.id]: variantId,
              }));
              if (addItem(product.id, variantId)) {
                toast.success("Added to bundle");
              }
            }}
            onQuantityChange={(newQuantity) => {
              const variantId = resolveVariantId();
              if (!variantId) return;

              if (newQuantity <= 0) {
                updateQuantity(product.id, variantId, 0);
                return;
              }

              if (addItem(product.id, variantId)) {
                toast.success("Added to bundle");
              } else {
                updateQuantity(product.id, variantId, newQuantity);
              }
            }}
          />
        );
      })}
    </div>
  );
}
