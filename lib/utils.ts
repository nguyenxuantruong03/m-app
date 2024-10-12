import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("de-DE",{
  style: 'currency',
  currency: 'VND',
})


export const formatSoldValue = (value: number): string => {
  if (value >= 1000) {
    const thousands = Math.floor(value / 1000);
    const remainder = value % 1000;
    const hundreds = Math.floor(remainder / 100); // Extract the hundreds part

    if (remainder === 0) {
      return `${thousands}k`; // Exact thousands (e.g., 1000 -> 1k)
    } else if (remainder % 100 === 0) {
      return `${thousands}k${hundreds}`; // Exact hundreds (e.g., 1200 -> 1k2)
    } else {
      return `${thousands}k${hundreds}`; // Thousands and a fractional part (e.g., 1500 -> 1k5)
    }
  }
  return value.toString();
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for(let i = 0; i < str.length; i++){
    hash = str.charCodeAt(1) + ((hash << 5) - hash)
  }

  let color = "#";
  for(let i = 0; i < 3; i++){
    const value = (hash >> (i* 8)) & 0xFF;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color
}