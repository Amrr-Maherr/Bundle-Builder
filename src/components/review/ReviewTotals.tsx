import { formatPrice, imageMap } from "@/utils";

type ReviewTotalsProps = {
  subtotal: number;
  total: number;
  savings: number;
  monthlyEstimate: number;
};

export function ReviewTotals({
  subtotal,
  total,
  savings,
  monthlyEstimate,
}: ReviewTotalsProps) {
  return (
    <>
      <div className="mt-[10px] flex w-full items-center justify-between">
        <img
          src={imageMap["Satisfaction Badge-05 1.png"] ?? ""}
          alt="100% Wyze satisfaction guarantee"
          className="size-[78px] shrink-0 object-contain"
        />
        <div className="flex flex-col items-end justify-between gap-[8px] md:items-center">
          <span className="rounded-[3px] bg-primary px-[8px] py-[5px] text-[12px] font-normal text-[#FFFFFF]">
            as low as {formatPrice(monthlyEstimate)}/mo
          </span>
          <div className="flex gap-[8px] whitespace-nowrap text-right leading-none">
            {savings > 0 && (
              <span className="text-[18px] font-normal text-[#6F7882] line-through">
                {formatPrice(subtotal)}
              </span>
            )}
            <span className="text-[24px] font-normal text-[#4E2FD2]">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <p className="mt-[14px] text-center text-[12px] text-[#0AA288]">
          Congrats! You're saving {formatPrice(savings)} on your security
          bundle!
        </p>
      )}
    </>
  );
}
