import { formatPrice } from "@/utils";

type ProductCardPricingProps = {
  hasSale: boolean;
  originalPrice: number;
  salePrice: number;
};

export function ProductCardPricing({
  hasSale,
  originalPrice,
  salePrice,
}: ProductCardPricingProps) {
  return (
    <div className="flex flex-row items-baseline gap-1 leading-tight md:flex-col md:items-end md:gap-0">
      {hasSale && (
        <span className="text-sm font-semibold text-destructive line-through">
          {formatPrice(originalPrice)}
        </span>
      )}
      <span className="text-base font-bold text-foreground md:text-lg">
        {formatPrice(salePrice)}
      </span>
    </div>
  );
}
