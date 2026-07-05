import { QuantityStepper } from "@/components/builder/QuantityStepper";
import type { QuantityChangeHandler } from "@/types";
import { formatPrice, imageMap } from "@/utils";
import {
  hasVariantSale,
  lineOriginalTotal,
  lineSaleTotal,
} from "@/utils/pricing";
import type { ReviewLine } from "./types";

type ReviewLineItemProps = {
  line: ReviewLine;
  onQuantityChange: QuantityChangeHandler;
};

export function ReviewLineItem({ line, onQuantityChange }: ReviewLineItemProps) {
  const { item, product, variant } = line;
  const image = imageMap[variant.image ?? product.image] ?? "";
  const hasSale = hasVariantSale(variant);
  const showVariant = product.variants.length > 1;

  return (
    <div className="flex items-center justify-start gap-[12px]">
      <div className="flex flex-1 items-center justify-start gap-[12px]">
        {image ? (
          <img
            src={image}
            alt=""
            aria-hidden
            className="size-[41px] shrink-0 object-contain"
          />
        ) : (
          <span className="size-6 shrink-0 rounded bg-muted" />
        )}
        <span className="truncate text-sm font-medium text-foreground">
          {product.name}
          {showVariant && (
            <span className="line-clamp-2 text-[14px] text-[#0B0D10]">
              {" "}
              · {variant.name}
            </span>
          )}
        </span>
      </div>
      <div className="flex items-center justify-center gap-[10px]">
        <QuantityStepper
          value={item.quantity}
          min={1}
          max={product.maxQuantity}
          onChange={(quantity) =>
            onQuantityChange(item.productId, item.variantId, quantity)
          }
        />
        <div className="flex flex-col items-center justify-center whitespace-nowrap text-right leading-none">
          {hasSale && (
            <span className="text-[14px] font-normal text-[#6F7882] line-through">
              {formatPrice(lineOriginalTotal(variant, item.quantity))}
            </span>
          )}
          <span className="text-[14px] font-normal text-[#4E2FD2]">
            {formatPrice(lineSaleTotal(variant, item.quantity))}
          </span>
        </div>
      </div>
    </div>
  );
}
