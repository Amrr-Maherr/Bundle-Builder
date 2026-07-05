import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerBundle } from "@/hooks/useServerBundle";
import { useProducts } from "@/hooks/useProducts";
import { fetchSummary, submitBundle } from "@/lib/api";
import { QuantityStepper } from "@/components/builder/QuantityStepper";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { formatPrice, imageMap } from "@/utils";

type SummaryGroup = {
  id: string;
  title: string;
  categories: string[];
}

type Summary = {
  groups: SummaryGroup[];
}

export function ReviewPlaceholder() {
  const { state, updateQuantity } = useServerBundle();
  const { data: products = [] } = useProducts();
  const {
    data: summary,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Summary>({
    queryKey: ["summary"],
    queryFn: fetchSummary,
  });

  const categoryGroup =
    summary?.groups.reduce<Record<string, string>>((map, g) => {
      for (const cat of g.categories) map[cat] = g.title;
      return map;
    }, {}) ?? {};

  const lines = state.items
    .map((item) => {
      const product = products.find(
        (p: { id: string }) => p.id === item.productId,
      );
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) return null;
      return {
        item,
        product,
        variant,
        group: categoryGroup[product.category] ?? "Other",
      };
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.variant.price * l.item.quantity,
    0,
  );
  const total = lines.reduce(
    (sum, l) =>
      sum + (l.variant.salePrice ?? l.variant.price) * l.item.quantity,
    0,
  );
  const savings = subtotal - total;
  const monthlyEstimate = total / 12;

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => submitBundle({ items: state.items, submittedAt: new Date().toISOString() }),
    onSuccess: () => {
      toast.success("Bundle saved!");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
    onError: () => {
      toast.error("Failed to save bundle");
    },
  });

  const groupTitles = summary?.groups.map((g) => g.title) ?? [];
  const groups = groupTitles
    .map((title) => ({
      title,
      items: lines.filter((l) => l.group === title),
    }))
    .filter((group) => group.items.length > 0);

  const planLine = lines.find((line) => line.product.category === "plan");

  const toMonthlyPrice = (price: number) => (price > 50 ? price / 12 : price);

  if (isError) {
    return (
      <ErrorState
        message={(error as Error)?.message ?? "Failed to load summary"}
        onRetry={() => refetch()}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-[#f6f5fb] p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-4 w-96 rounded bg-muted" />
          <div className="h-32 rounded-lg bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EDF4FF] rounded-[10px]">
      <div className="px-[15px] md:pt-[20px] pt-[15px] pb-[5px]">
        <p className="text-[#484848]">Review</p>
      </div>
      <div className="flex items-center justify-center flex-col pt-5 pr-5 pl-5 pb-[31px]">
        <div>
          <h2 className="text-[22px] font-normal text-[#1F1F1F] mb-[5px]">
            Your security system
          </h2>
          <p className="text-[14px] max-w-[350px] text-[#1F1F1FBF] opacity-75 pb-[10px]">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
          <hr className="bg-[#CED6DE] h-[1px] w-full" />
          {groups.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Your bundle is empty"
              description="Add products from the steps above to build your security system."
            />
          ) : (
            <div className="pt-[15px] pb-[10px]">
              {groups.map((group) => (
                <div
                  key={group.title}
                  className={`border border-b-1 border-[#CED6DE] border-t-0 border-r-0 border-l-0 pb-[10px] pt-[15px] ${
                    group.title === "Plan" ? "hidden md:block" : ""
                  }`}
                >
                  <h3 className="mb-[8px] text-[12px] font-normal uppercase text-[#A8B2BD]">
                    {group.title}
                  </h3>
                  <div className="flex gap-[12px] flex-col">
                    {group.items.map(({ item, product, variant }) => {
                      const image =
                        imageMap[variant.image || product.image] ?? "";
                      const hasSale = variant.onSale ?? false;
                      const original = variant.price * item.quantity;
                      const final =
                        (variant.salePrice ?? variant.price) * item.quantity;
                      const showVariant = product.variants.length > 1;

                      return (
                        <div
                          key={`${item.productId}-${item.variantId}`}
                          className="flex items-center justify-start gap-[12px]"
                        >
                          <div className="flex items-center justify-start flex-1 gap-[12px]">
                            {image ? (
                              <img
                                src={image}
                                alt="image"
                                aria-hidden
                                className="size-[41px] shrink-0 object-contain"
                              />
                            ) : (
                              <span className="size-6 shrink-0 rounded bg-muted" />
                            )}
                            <span className="truncate text-sm font-medium text-foreground">
                              {product.name}
                              {showVariant && (
                                <span className="text-[#0B0D10] text-[14px] line-clamp-2">
                                  {" "}
                                  · {variant.name}
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-[10px]">
                            <QuantityStepper
                              value={item.quantity}
                              min={1}
                              max={product.maxQuantity}
                              onChange={(q) =>
                                updateQuantity(
                                  item.productId,
                                  item.variantId,
                                  q,
                                )
                              }
                            />
                            <div className="flex items-center justify-center flex-col whitespace-nowrap text-right leading-none">
                              {hasSale && (
                                <span className="text-[14px] font-normal text-[#6F7882] line-through">
                                  {formatPrice(original)}
                                </span>
                              )}
                              <span className="text-[14px] font-normal text-[#4E2FD2]">
                                {formatPrice(final)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <hr className="bg-[#CED6DE] h-[1px] w-full" /> */}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full">
          {planLine && (
            <div className="md:hidden w-full border-t border-[#A8B2BD] pt-[15px] pb-[10px]">
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
                  {planLine.product.name.split(" ")[0]}{" "}
                  <span className="text-[#4E2FD2]">
                    {planLine.product.name.split(" ").slice(1).join(" ")}
                  </span>
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
          )}

          <div className="flex items-start gap-[12px] border-t border-[#CED6DE] pt-[10px] md:border-t-0 md:pt-0">
            <img
              src={imageMap["Wyze Sense Keypad.png"] ?? ""}
              alt="Fast shipping"
              className="size-[41px] shrink-0 object-contain"
            />
            <div className="flex items-center justify-between w-full">
              <h3 className="text-[14px] font-normal text-[#0B0D10]">
                Fast Shipping
              </h3>
              <div className="text-right leading-none">
                <p className="text-[14px] text-[#6F7882] line-through">$5.99</p>
                <p className="text-[14px] text-[#4E2FD2]">FREE</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mt-[10px]">
            <img
              src={imageMap["Satisfaction Badge-05 1.png"] ?? ""}
              alt="100% Wyze satisfaction guarantee"
              className="size-[78px] shrink-0 object-contain"
            />
            <div className="flex md:items-center items-end flex-col justify-between gap-[8px]">
              <span className="rounded-[3px] bg-primary px-[8px] py-[5px] text-[12px] font-normal text-[#FFFFFF]">
                as low as {formatPrice(monthlyEstimate)}/mo
              </span>
              <div className="whitespace-nowrap text-right leading-none flex gap-[8px]">
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

          <button
            type="button"
            disabled={total === 0}
            className="mt-[4px] w-full rounded-[4px] bg-primary py-[13px] text-[17px] font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            Checkout
          </button>
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="mt-[8px] text-center text-xs italic text-[#484848] underline underline-offset-2 transition-colors hover:text-foreground disabled:opacity-50 cursor-pointer"
          >
            {saveMutation.isPending
              ? "Saving..."
              : saveMutation.isSuccess
                ? "Saved!"
                : "Save my system for later"}
          </button>
        </div>
      </div>
    </div>
  );
}
