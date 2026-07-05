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
  const mainImage =
    imageMap[selectedVariant.image ?? product.image] ?? "";
  const isSelected = quantity > 0;
  const showVariants = product.variants.length > 1;

  const handleCardClick = () => {
    if (isSelected) {
      onQuantityChange(0);
    } else if (!showVariants) {
      onQuantityChange(1);
    }
  };

  const salePrice = hasSale
    ? (selectedVariant.salePrice as number)
    : selectedVariant.price;

  return (
    <div
      onClick={handleCardClick}
      style={isSelected ? { borderColor: "#4E2FD2B2" } : undefined}
      className={`flex h-full cursor-pointer flex-col rounded-[16px] border-2 bg-card px-[25px]! py-[11px]! transition-colors md:flex-row md:gap-5 md:p-5 ${
        isSelected ? "" : "border-[#e2dbf6]"
      }`}
    >
      <div className="relative flex w-full shrink-0 items-center justify-center py-1 md:w-[101px] md:min-h-[137px] md:py-0">
        {discount > 0 && (
          <span className="absolute left-0 top-0 z-10 rounded-full bg-primary px-2 py-0.5 text-xs font-normal text-primary-foreground">
            Save {discount}%
          </span>
        )}
        {mainImage && (
          <img
            src={mainImage}
            alt={product.name}
            className="h-[140px] w-full max-w-[220px] object-contain md:h-[137px] md:w-[101px] md:max-w-[101px] md:rounded-[5px]"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col md:mt-0">
        <h3 className="text-lg font-bold leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="pt-[8px] m-0! text-[12px] text-[#1F1F1FBF]">
          {product.description}{" "}
          <a
            href={product.learnMoreUrl ?? "#"}
            onClick={(e) => e.stopPropagation()}
            className="font-bold text-[#2563eb] underline underline-offset-2 md:hidden"
          >
            Learn More
          </a>
        </p>
        <a
          href={product.learnMoreUrl ?? "#"}
          onClick={(e) => e.stopPropagation()}
          className="hidden w-fit text-[12px] font-normal text-[#2563eb] underline underline-offset-2 md:block"
        >
          Learn More
        </a>

        {showVariants && (
          <div className="mt-3">
            <VariantSelector
              variants={product.variants}
              selectedId={effectiveVariantId}
              onSelect={onVariantSelect}
            />
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 pt-[10px] md:items-end">
          <QuantityStepper
            value={quantity}
            min={1}
            max={product.maxQuantity}
            onChange={onQuantityChange}
          />
          <div className="flex flex-row items-baseline gap-1 leading-tight md:flex-col md:items-end md:gap-0">
            {hasSale && (
              <span className="text-sm font-semibold text-destructive line-through">
                {formatPrice(selectedVariant.price)}
              </span>
            )}
            <span className="text-base font-bold text-foreground md:text-lg">
              {formatPrice(salePrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
