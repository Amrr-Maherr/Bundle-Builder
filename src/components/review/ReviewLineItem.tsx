import { QuantityStepper } from "@/components/builder/QuantityStepper";
import { formatPrice, imageMap } from "@/utils";
import type { ReviewLine } from "./types";

type ReviewLineItemProps = {
  line: ReviewLine;
  onQuantityChange: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
};

export function ReviewLineItem({ line, onQuantityChange }: ReviewLineItemProps) {
  const { item, product, variant } = line;
  const image = imageMap[variant.image || product.image] ?? "";
  const hasSale = variant.onSale ?? false;
  const original = variant.price * item.quantity;
  const final = (variant.salePrice ?? variant.price) * item.quantity;
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
          onChange={(q) =>
            onQuantityChange(item.productId, item.variantId, q)
          }
        />
        <div className="flex flex-col items-center justify-center whitespace-nowrap text-right leading-none">
          {hasSale && (
            <span className="text-[14px] font-normal text-[#6F7882] line-through">
              {formatPrice(original)}
            </span>
          )}
          <span className="text-[14px] font-normal text-[#4E2FD2]">
            {formatPrice(final)}
          </span>
        </div>
      </div>
    </div>
  );
}
