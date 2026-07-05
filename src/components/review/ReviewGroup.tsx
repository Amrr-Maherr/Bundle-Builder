import { ReviewLineItem } from "./ReviewLineItem";
import type { ReviewGroupData } from "./types";

type ReviewGroupProps = {
  group: ReviewGroupData;
  onQuantityChange: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
};

export function ReviewGroup({ group, onQuantityChange }: ReviewGroupProps) {
  return (
    <div
      className={`border border-b border-[#CED6DE] border-l-0 border-r-0 border-t-0 pb-[10px] pt-[15px] ${
        group.title === "Plan" ? "hidden md:block" : ""
      }`}
    >
      <h3 className="mb-[8px] text-[12px] font-normal uppercase text-[#A8B2BD]">
        {group.title}
      </h3>
      <div className="flex flex-col gap-[12px]">
        {group.items.map((line) => (
          <ReviewLineItem
            key={`${line.item.productId}-${line.item.variantId}`}
            line={line}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}
