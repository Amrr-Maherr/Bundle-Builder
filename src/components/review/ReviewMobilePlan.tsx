import { formatPrice, imageMap } from "@/utils";
import { getSalePrice, hasVariantSale, toMonthlyPrice } from "@/utils/pricing";
import type { ReviewLine } from "./types";

type ReviewMobilePlanProps = {
  planLine: ReviewLine;
};

export function ReviewMobilePlan({ planLine }: ReviewMobilePlanProps) {
  const { product, variant } = planLine;
  const [firstWord, ...restWords] = product.name.split(" ");

  return (
    <div className="w-full border-t border-[#A8B2BD] pb-[10px] pt-[15px] md:hidden">
      <h3 className="mb-[8px] text-[12px] font-normal uppercase text-[#A8B2BD]">
        Home Monitoring Plan
      </h3>
      <div className="flex items-center gap-[12px] border-b border-[#CED6DE] pb-[10px]">
        <img
          src={imageMap[variant.image ?? product.image] ?? ""}
          alt=""
          aria-hidden
          className="size-[14px] shrink-0 object-contain"
        />
        <div className="flex flex-1 items-center text-[14px] font-normal text-[#0B0D10]">
          {firstWord}{" "}
          <span className="text-[#4E2FD2]">{restWords.join(" ")}</span>
        </div>
        <div className="whitespace-nowrap text-right leading-none">
          {hasVariantSale(variant) && (
            <p className="text-[12px] text-[#6F7882] line-through">
              {formatPrice(toMonthlyPrice(variant.price))}/mo
            </p>
          )}
          <p className="text-[12px] text-[#4E2FD2]">
            {formatPrice(toMonthlyPrice(getSalePrice(variant)))}/mo
          </p>
        </div>
      </div>
    </div>
  );
}
