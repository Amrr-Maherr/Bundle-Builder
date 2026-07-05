import type { BundleItem, BundleState, Product } from "@/types";

const BASE_URL = "http://localhost:3001";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`Request failed: ${path}`);
  return res.json();
}

export function fetchProducts() {
  return apiFetch<Product[]>("/products");
}

export function fetchSummary() {
  return apiFetch<{ groups: { id: string; title: string; categories: string[] }[] }>(
    "/summary",
  );
}

export function fetchBundle() {
  return apiFetch<BundleState>("/bundle");
}

export function saveBundle(items: BundleItem[], currentStep: number) {
  return apiFetch<BundleState>("/bundle", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, currentStep }),
  });
}

export function submitBundle(data: unknown) {
  return apiFetch<unknown>("/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
