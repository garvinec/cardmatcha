import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Detects if the user agent indicates a mobile device
 * @param userAgent - The user agent string from the request headers
 * @returns true if the device appears to be mobile
 */
export function isMobileDevice(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;

  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
}
