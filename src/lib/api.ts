const BASE_URL = "http://localhost:3001";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchSummary() {
  const res = await fetch(`${BASE_URL}/summary`);
  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

export async function fetchBundle(): Promise<{ items: { productId: string; variantId: string; quantity: number }[]; currentStep: number }> {
  const res = await fetch(`${BASE_URL}/bundle`);
  if (!res.ok) throw new Error("Failed to fetch bundle");
  return res.json();
}

export async function saveBundle(items: { productId: string; variantId: string; quantity: number }[], currentStep: number) {
  const res = await fetch(`${BASE_URL}/bundle`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, currentStep }),
  });
  if (!res.ok) throw new Error("Failed to save bundle");
  return res.json();
}

export async function submitBundle(data: unknown) {
  const res = await fetch(`${BASE_URL}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit bundle");
  return res.json();
}


