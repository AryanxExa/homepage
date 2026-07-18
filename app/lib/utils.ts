import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatAED(value: number): string {
  return `AED ${Math.round(value).toLocaleString("en-AE")}`;
}
