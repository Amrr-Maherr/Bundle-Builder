import { Minus, Plus } from "lucide-react";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}

export function QuantityStepper({
  value,
  min = 0,
  max,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-[12px]">
      <button
        type="button"
        disabled={value <= min}
        onClick={(e) => {
          e.stopPropagation();
          onChange(value - 1);
        }}
        className="flex size-[20px] items-center justify-center bg-[#FFFFFF] text-black transition-colors hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-40 rounded-[4px] cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus className="size-[8px]" />
      </button>
      <span className="flex items-center justify-center text-[14px] font-normal">
        {value}
      </span>
      <button
        type="button"
        disabled={value >= max}
        onClick={(e) => {
          e.stopPropagation();
          onChange(value + 1);
        }}
        className="flex size-[20px] items-center justify-center bg-[#FFFFFF] text-black transition-colors hover:bg-muted/70 disabled:cursor-not-allowed disabled:opacity-40 rounded-[4px] cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className="size-[8px]" />
      </button>
    </div>
  );
}
