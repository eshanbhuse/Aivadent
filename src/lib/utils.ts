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

export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

export const getAvailableTimeSlots = () => {
  return ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00", "04:00", "05:00"
  ];
}

export const APPOINTMENT_TYPES = [
  {id: "consultation", name: "Consultation", duration: "60 min", price: "₹500"},
  {id: "cleaning", name: "Teeth Cleaning", duration: "20 min", price: "₹800"},
  {id: "extraction", name: "Teeth Extraction", duration: "30 min", price: "₹2000"},
  {id: "whitening", name: "Teeth Whitening", duration: "90 min", price: "₹300"},
];