import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { CURRENCY } from "../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateTravelDates = (departDate: Date, returnDate: Date): boolean => {
  return returnDate > departDate;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: CURRENCY,
  }).format(price);
};

export const formatDate = (dateString: string, includeHours = true) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  if (includeHours) {
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    return `${formattedDate} ${formattedTime}`;
  }

  return formattedDate;
};