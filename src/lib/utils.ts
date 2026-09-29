import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount?: number | null): string {
  if (amount === undefined || amount === null) return 'Consultar precio';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatHours(hours?: number | null): string {
  if (hours === undefined || hours === null) return 'N/D';
  return `${new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(hours)} hrs`;
}

export function formatDate(dateString?: string): string {
  if (!dateString) return 'N/D';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-VE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function buildWhatsAppLink(message: string, phoneNumber = '584120000000'): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
