import { useState } from "react";
import toast from "react-hot-toast";
import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  addItem: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
  getProductItems: (
    productId: string,
  ) => { productId: string; variantId: string; quantity: number }[];
};

export const productGridClassName =
  "grid grid-cols-1 gap-[15px] pt-[5px] md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:w-[calc(50%-7.5px)] md:[&>*:last-child:nth-child(odd)]:justify-self-center";

export function ProductGrid({
  products,
  addItem,
  updateQuantity,
  getProductItems,
}: ProductGridProps) {
  const [activeVariant, setActiveVariant] = useState<Record<string, string>>(
    {},
  );

  return (
    <div className={productGridClassName}>
      {products.map((product) => {
        const items = getProductItems(product.id);
        const activeId =
          activeVariant[product.id] ?? items[0]?.variantId ?? null;
        const activeItem = activeId
          ? items.find((i) => i.variantId === activeId)
          : undefined;
        const quantity = activeItem?.quantity ?? 0;

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
              const exists = items.some((i) => i.variantId === variantId);
              if (!exists) {
                addItem(product.id, variantId);
                toast.success("Added to bundle");
              }
            }}
            onQuantityChange={(newQuantity) => {
              if (newQuantity <= 0) {
                if (activeId) updateQuantity(product.id, activeId, 0);
                return;
              }
              if (!activeId) {
                if (product.variants.length > 1) return;
                addItem(product.id, product.variants[0].id);
                toast.success("Added to bundle");
                return;
              }
              updateQuantity(product.id, activeId, newQuantity);
            }}
          />
        );
      })}
    </div>
  );
}
