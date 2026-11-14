export function formatPrice(price: number): string {
  const numeric = Number(price);
  const value = Number.isFinite(numeric) ? numeric : 0;
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return `MMK ${formatted}`;
}
