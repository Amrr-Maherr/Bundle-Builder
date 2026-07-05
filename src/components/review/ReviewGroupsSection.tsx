import { ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import type { QuantityChangeHandler } from "@/types";
import { ReviewGroup } from "./ReviewGroup";
import type { ReviewGroupData } from "./types";

type ReviewGroupsSectionProps = {
  groups: ReviewGroupData[];
  onQuantityChange: QuantityChangeHandler;
};

export function ReviewGroupsSection({
  groups,
  onQuantityChange,
}: ReviewGroupsSectionProps) {
  return (
    <div>
      <h2 className="mb-[5px] text-[22px] font-normal text-[#1F1F1F]">
        Your security system
      </h2>
      <p className="max-w-[350px] pb-[10px] text-[14px] text-[#1F1F1FBF] opacity-75">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
      <hr className="h-px w-full bg-[#CED6DE]" />
      {groups.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your bundle is empty"
          description="Add products from the steps above to build your security system."
        />
      ) : (
        <div className="pb-[10px] pt-[15px]">
          {groups.map((group) => (
            <ReviewGroup
              key={group.title}
              group={group}
              onQuantityChange={onQuantityChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
