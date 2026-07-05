import { QuantityStepper } from "@/components/builder/QuantityStepper";
import { ProductCardPricing } from "./ProductCardPricing";

type ProductCardFooterProps = {
  quantity: number;
  maxQuantity: number;
  hasSale: boolean;
  originalPrice: number;
  salePrice: number;
  onQuantityChange: (quantity: number) => void;
};

export function ProductCardFooter({
  quantity,
  maxQuantity,
  hasSale,
  originalPrice,
  salePrice,
  onQuantityChange,
}: ProductCardFooterProps) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4 pt-[10px] md:items-end">
      <QuantityStepper
        value={quantity}
        min={1}
        max={maxQuantity}
        onChange={onQuantityChange}
      />
      <ProductCardPricing
        hasSale={hasSale}
        originalPrice={originalPrice}
        salePrice={salePrice}
      />
    </div>
  );
}
