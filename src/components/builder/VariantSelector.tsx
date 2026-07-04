import type { Variant } from "@/types";
import { imageMap } from "@/utils";

type VariantSelectorProps = {
  variants: Variant[];
  selectedId: string;
  onSelect: (variantId: string) => void;
};

export function VariantSelector({
  variants,
  selectedId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedId;
        const thumb = variant.image ? (imageMap[variant.image] ?? "") : "";
        return (
          <button
            key={variant.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(variant.id);
            }}
            style={isSelected ? { borderColor: "#0AA288" } : undefined}
            className={`flex items-center gap-1.5 rounded-lg border-2 px-[6.5px] py-[2px] text-[10px] cursor-pointer font-normal text-[#1F1F1F] ${
              isSelected
                ? "bg-[#1DF0BB0A]"
                : "border-border bg-background hover:border-muted-foreground/40"
            }`}
          >
            {thumb && (
              <img
                src={thumb}
                alt=""
                aria-hidden
                className="size-[22px] shrink-0 object-contain"
              />
            )}
            <span>{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
}
