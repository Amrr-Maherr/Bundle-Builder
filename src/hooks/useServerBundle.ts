import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBundle, saveBundle } from "@/lib/api";

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
    mutationFn: (data: { items: typeof items; currentStep: number }) => saveBundle(data.items, data.currentStep),
    onSuccess: (result) => {
      queryClient.setQueryData(BUNDLE_KEY, result);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const save = (nextItems: typeof items, step?: number) => {
    persist.mutate({ items: nextItems, currentStep: step ?? currentStep });
  };

  const addItem = (productId: string, variantId: string) => {
    const exists = items.some(
      (item) => item.productId === productId && item.variantId === variantId
    );
    if (exists) return;
    save([...items, { productId, variantId, quantity: 1 }]);
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      save(items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      ));
      return;
    }
    save(items.map((item) =>
      item.productId === productId && item.variantId === variantId
        ? { ...item, quantity }
        : item
    ));
  };

  const setCurrentStep = (step: number) => {
    save(items, step);
  };

  const getProductItems = (productId: string) =>
    items.filter((item) => item.productId === productId);

  return {
    state: { currentStep, items },
    addItem,
    updateQuantity,
    setCurrentStep,
    getProductItems,
    isLoading,
  };
}
