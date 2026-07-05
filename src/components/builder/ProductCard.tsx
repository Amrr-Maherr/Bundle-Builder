import type { Product } from "@/types";
import { VariantSelector } from "./VariantSelector";
import { imageMap } from "@/utils";
import { ProductCardFooter } from "./product-card/ProductCardFooter";
import { ProductCardImage } from "./product-card/ProductCardImage";
import { ProductCardInfo } from "./product-card/ProductCardInfo";

type ProductCardProps = {
  product: Product;
  selectedVariantId: string | null;
  quantity: number;
  onVariantSelect: (variantId: string) => void;
  onQuantityChange: (quantity: number) => void;
};

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
      <ProductCardImage
        imageSrc={mainImage}
        alt={product.name}
        discount={discount}
      />

      <div className="flex min-w-0 flex-1 flex-col md:mt-0">
        <ProductCardInfo
          name={product.name}
          description={product.description}
          learnMoreUrl={product.learnMoreUrl}
        />

        {showVariants && (
          <div className="mt-3">
            <VariantSelector
              variants={product.variants}
              selectedId={effectiveVariantId}
              onSelect={onVariantSelect}
            />
          </div>
        )}

        <ProductCardFooter
          quantity={quantity}
          maxQuantity={product.maxQuantity}
          hasSale={hasSale}
          originalPrice={selectedVariant.price}
          salePrice={salePrice}
          onQuantityChange={onQuantityChange}
        />
      </div>
    </div>
  );
}
