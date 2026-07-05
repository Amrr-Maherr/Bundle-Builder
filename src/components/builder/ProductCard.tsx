import type { Product } from "@/types";
import { findVariant } from "@/utils/products";
import { getSalePrice, hasVariantSale } from "@/utils/pricing";
import { imageMap } from "@/utils";
import { VariantSelector } from "./VariantSelector";
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
  const selectedVariant = findVariant(product, selectedVariantId);
  const hasSale = hasVariantSale(selectedVariant);
  const isSelected = quantity > 0;
  const showVariants = product.variants.length > 1;

  const handleCardClick = () => {
    if (isSelected) onQuantityChange(0);
    else if (!showVariants) onQuantityChange(1);
  };

  return (
    <div
      onClick={handleCardClick}
      style={isSelected ? { borderColor: "#4E2FD2B2" } : undefined}
      className={`flex h-full cursor-pointer flex-col rounded-[10px] border-2 bg-card px-[25px]! py-[11px]! transition-colors md:flex-row md:gap-5 md:p-5 ${
        isSelected ? "" : "border-[#e2dbf6]"
      }`}
    >
      <ProductCardImage
        imageSrc={imageMap[selectedVariant.image ?? product.image] ?? ""}
        alt={product.name}
        discount={selectedVariant.discountPercent ?? 0}
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
              product={product}
              variants={product.variants}
              selectedId={selectedVariant.id}
              onSelect={onVariantSelect}
            />
          </div>
        )}

        <ProductCardFooter
          quantity={quantity}
          maxQuantity={product.maxQuantity}
          hasSale={hasSale}
          originalPrice={selectedVariant.price}
          salePrice={getSalePrice(selectedVariant)}
          onQuantityChange={onQuantityChange}
        />
      </div>
    </div>
  );
}
