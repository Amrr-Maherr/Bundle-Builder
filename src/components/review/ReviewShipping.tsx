import { imageMap } from "@/utils";

export function ReviewShipping() {
  return (
    <div className="flex items-start gap-[12px] border-t border-[#CED6DE] pt-[10px] md:border-t-0 md:pt-0">
      <img
        src={imageMap["Wyze Sense Keypad.png"] ?? ""}
        alt="Fast shipping"
        className="size-[41px] shrink-0 object-contain"
      />
      <div className="flex w-full items-center justify-between">
        <h3 className="text-[14px] font-normal text-[#0B0D10]">Fast Shipping</h3>
        <div className="text-right leading-none">
          <p className="text-[14px] text-[#6F7882] line-through">$5.99</p>
          <p className="text-[14px] text-[#4E2FD2]">FREE</p>
        </div>
      </div>
    </div>
  );
}
