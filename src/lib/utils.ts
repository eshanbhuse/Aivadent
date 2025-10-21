import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender:"MALE" | "FEMALE")
{
  const username = name.replace(/\s+/g, '').toLowerCase();
  const base ="https://avatar.iran.liara.run/public";
  if(gender === "FEMALE") return `${base}/girl?username=${username}`;
  return `${base}/boy?username=${username}`;
}
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  let digits = value.replace(/\D/g, "");

  // Handle cases like +91 or 0 prefix
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(-10);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // If fewer than 10 digits, don't throw — just return current value
  if (digits.length < 10) {
    return digits; // user still typing
  }

  // If more than 10 digits, trim to last 10
  if (digits.length > 10) {
    digits = digits.slice(-10);
  }

  // Return formatted 10-digit number
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}
