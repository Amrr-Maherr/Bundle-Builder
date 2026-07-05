import { formatPrice, imageMap } from "@/utils";
import type { ReviewLine } from "./types";

type ReviewMobilePlanProps = {
  planLine: ReviewLine;
};

const toMonthlyPrice = (price: number) => (price > 50 ? price / 12 : price);

export function ReviewMobilePlan({ planLine }: ReviewMobilePlanProps) {
  const [firstWord, ...restWords] = planLine.product.name.split(" ");

  return (
    <div className="w-full border-t border-[#A8B2BD] pb-[10px] pt-[15px] md:hidden">
      <h3 className="mb-[8px] text-[12px] font-normal uppercase text-[#A8B2BD]">
        Home Monitoring Plan
      </h3>
      <div className="flex items-center gap-[12px] border-b border-[#CED6DE] pb-[10px]">
        <img
          src={imageMap["Layer_1.png"] ?? ""}
          alt=""
          aria-hidden
          className="size-[14px] shrink-0 object-contain"
        />
        <div className="flex flex-1 items-center text-[14px] font-normal text-[#0B0D10]">
          {firstWord}{" "}
          <span className="text-[#4E2FD2]">{restWords.join(" ")}</span>
        </div>
        <div className="whitespace-nowrap text-right leading-none">
          {planLine.variant.onSale && (
            <p className="text-[12px] text-[#6F7882] line-through">
              {formatPrice(toMonthlyPrice(planLine.variant.price))}/mo
            </p>
          )}
          <p className="text-[12px] text-[#4E2FD2]">
            {formatPrice(
              toMonthlyPrice(
                planLine.variant.salePrice ?? planLine.variant.price,
              ),
            )}
            /mo
          </p>
        </div>
      </div>
    </div>
  );
}
