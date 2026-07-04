import type { Product } from "@/types";
import { VariantSelector } from "./VariantSelector";
import { QuantityStepper } from "./QuantityStepper";
import { formatPrice, imageMap } from "@/utils";

type ProductCardProps = {
  product: Product;
  selectedVariantId: string | null;
  quantity: number;
  onVariantSelect: (variantId: string) => void;
  onQuantityChange: (quantity: number) => void;
}

export function ProductCard({
  product,
  selectedVariantId,
  quantity,
  onVariantSelect,
  onQuantityChange,
}: ProductCardProps) {
  const effectiveVariantId = selectedVariantId ?? product.variants[0].id;
  const selectedVariant =
    product.variants.find((v) => v.id === effectiveVariantId) ??
    product.variants[0];

  const hasSale = selectedVariant.onSale ?? false;
  const discount = selectedVariant.discountPercent ?? 0;
  const mainImage = imageMap[product.image] ?? "";
  const isSelected = quantity > 0;
  const showVariants = product.variants.length > 1;

  const handleCardClick = () => {
    if (isSelected) {
      onQuantityChange(0);
    } else if (!showVariants) {
      onQuantityChange(1);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      style={isSelected ? { borderColor: "#4E2FD2B2" } : undefined}
      className={`flex h-full cursor-pointer flex-col rounded-[15px] border-2 bg-card px-[11px] py-[29.35px] transition-colors ${
        isSelected ? "" : "border-[#e2dbf6]"
      }`}
    >
      <div className="relative mb-3 flex items-center justify-center">
        {discount > 0 && (
          <span className="absolute left-0 top-0 rounded-full bg-primary px-[6px] py-[2px] text-[12px] font-normal text-primary-foreground">
            Save {discount}%
          </span>
        )}
        {mainImage && (
          <img
            src={mainImage}
            alt={product.name}
            className=" w-[202.6px] h-[117.3944px] object-contain"
          />
        )}
      </div>

      <h3 className="text-lg font-bold leading-tight text-foreground">
        {product.name}
      </h3>
      <p className="mt-[8px] text-sm leading-snug text-muted-foreground">
        {product.description}{" "}
        <a
          href={product.learnMoreUrl ?? "#"}
          onClick={(e) => e.stopPropagation()}
          className="font-bold text-[#2563eb] underline underline-offset-2"
        >
          Learn More
        </a>
      </p>

      {showVariants && (
        <div className="mt-3">
          <VariantSelector
            variants={product.variants}
            selectedId={effectiveVariantId}
            onSelect={onVariantSelect}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-[10px]">
        <QuantityStepper
          value={quantity}
          min={1}
          max={product.maxQuantity}
          onChange={onQuantityChange}
        />
        <div className="whitespace-nowrap text-right leading-tight">
          {hasSale && (
            <span className="mr-1 text-sm font-semibold text-destructive line-through">
              {formatPrice(selectedVariant.price)}
            </span>
          )}
          <span className="text-base font-bold text-foreground">
            {formatPrice(
              hasSale
                ? (selectedVariant.salePrice as number)
                : selectedVariant.price,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
