import type { ReactNode } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AccordionPlaceholder } from "@/components/builder/AccordionPlaceholder";
import { ProductGrid } from "@/components/builder/ProductGrid";
import { useServerBundle } from "@/hooks/useServerBundle";
import { useProducts } from "@/hooks/useProducts";
import { Package } from "lucide-react";
import camerasIcon from "@/assets/icons/livestream.svg";
import planIcon from "@/assets/icons/logo_hms_new 1.svg";
import sensorsIcon from "@/assets/icons/Frame 1419.svg";
import { ErrorState } from "@/components/shared/ErrorState";
import { ProductCardSkeleton } from "@/components/builder/ProductCardSkeleton";

type StepConfig = {
  step: number;
  title: string;
  icon: ReactNode;
  categories: string[];
  nextLabel?: string;
}

const steps: StepConfig[] = [
  {
    step: 1,
    title: "Choose your cameras",
    icon: <img src={camerasIcon} alt="" className="size-6" />,
    categories: ["camera", "doorbell"],
    nextLabel: "Next: Choose your plan",
  },
  {
    step: 2,
    title: "Choose your plan",
    icon: <img src={planIcon} alt="" className="size-6" />,
    categories: ["plan"],
    nextLabel: "Next: Choose your sensors",
  },
  {
    step: 3,
    title: "Choose your sensors",
    icon: <img src={sensorsIcon} alt="" className="size-6" />,
    categories: ["sensor"],
    nextLabel: "Next: Add extra protection",
  },
  {
    step: 4,
    title: "Add extra protection",
    icon: <Package className="size-6" />,
    categories: ["protection"],
  },
];

export function BuilderSection() {
  const { state, addItem, updateQuantity, getProductItems, setCurrentStep } = useServerBundle();
  const { data: products = [], isLoading, isError, error, refetch } = useProducts();

  if (isError) {
    return (
      <ErrorState
        message={(error as Error)?.message ?? "Failed to load products"}
        onRetry={() => refetch()}
      />
    );
  }

  const handleStepChange = (val: string) => {
    const step = Number(val);
    if (step) setCurrentStep(step);
  };

  return (
    <Accordion type="single" collapsible value={String(state.currentStep)} onValueChange={handleStepChange} className="gap-4">
      {steps.map((config) => {
        const stepProducts = isLoading ? [] : products.filter((p: { category: string }) => config.categories.includes(p.category));
        const selectedCount = new Set(
          state.items
            .filter((item) => stepProducts.some((p) => p.id === item.productId))
            .map((item) => item.productId)
        ).size;

        return (
          <AccordionPlaceholder
            key={config.step}
            step={config.step}
            title={config.title}
            icon={config.icon}
            selectedCount={selectedCount}
          >
            {isLoading ? (
              <div className="grid grid-cols-1 gap-[15px] md:grid-cols-3 lg:grid-cols-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <ProductGrid
                products={stepProducts}
                addItem={addItem}
                updateQuantity={updateQuantity}
                getProductItems={getProductItems}
              />
            )}
            {config.nextLabel && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(config.step + 1)}
                  className="rounded-lg border-2 border-primary bg-card px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5"
                >
                  {config.nextLabel}
                </button>
              </div>
            )}
          </AccordionPlaceholder>
        );
      })}
    </Accordion>
  );
}
