import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const extractIdFromUrl = (url: string): string => {
    const pattern = /([a-fA-F0-9]{32})/;
    const match = url.match(pattern);
    if (match) {
        return match[1];
    } else {
        return "";
    }
};