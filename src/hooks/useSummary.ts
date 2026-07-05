import { useQuery } from "@tanstack/react-query";
import { fetchSummary } from "@/lib/api";
import type { Summary } from "@/components/review/types";

export function useSummary() {
  return useQuery<Summary>({
    queryKey: ["summary"],
    queryFn: fetchSummary,
  });
}
