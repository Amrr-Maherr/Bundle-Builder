import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBundle, saveBundle } from "@/lib/api";
import type { BundleItem } from "@/types";

const BUNDLE_KEY = ["bundle"];

export function useServerBundle() {
  const queryClient = useQueryClient();

  const { data: bundle, isLoading } = useQuery({
    queryKey: BUNDLE_KEY,
    queryFn: fetchBundle,
  });

  const items = bundle?.items ?? [];
  const currentStep = bundle?.currentStep ?? 1;

  const persist = useMutation({
    mutationFn: (data: { items: BundleItem[]; currentStep: number }) =>
      saveBundle(data.items, data.currentStep),
    onSuccess: (result) => {
      queryClient.setQueryData(BUNDLE_KEY, result);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const save = (nextItems: BundleItem[], step = currentStep) => {
    persist.mutate({ items: nextItems, currentStep: step });
  };

  const addItem = (productId: string, variantId: string) => {
    const exists = items.some(
      (item) => item.productId === productId && item.variantId === variantId,
    );
    if (exists) return false;
    save([...items, { productId, variantId, quantity: 1 }]);
    return true;
  };

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      save(
        items.filter(
          (item) =>
            !(item.productId === productId && item.variantId === variantId),
        ),
      );
      return;
    }

    save(
      items.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const setCurrentStep = (step: number) => {
    save(items, step);
  };

  return {
    state: { currentStep, items },
    addItem,
    updateQuantity,
    setCurrentStep,
    isLoading,
  };
}
