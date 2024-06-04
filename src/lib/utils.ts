import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidDomainOrEmail(input: string): boolean {
  const domainPattern = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,11}?$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (domainPattern.test(input)) {
    return true;
  } else if (emailPattern.test(input)) {
    return true;
  } else {
    return false;
  }
}

export function isValidEmailForPublicReport(email: string, domain: string) {
  // Regular expression for validating email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email matches the pattern
  if (!emailPattern.test(email)) {
    return "invalid-email";
  }

  // Extract the domain part of the email
  const emailDomain = email.substring(email.lastIndexOf("@") + 1);

  // Compare the extracted domain with the provided domain
  return emailDomain === domain ? "valid" : "invalid-domain";
}

export const getApiErrorMessage = (
  error: any,
  fallbackErrorMessage?: string,
) => {
  const defaultErrorMessage =
    fallbackErrorMessage || "Something went wrong. Please try again.";

  let errorMessage = defaultErrorMessage;

  try {
    errorMessage = error.response?.data.data;
  } catch (error) {}

  return errorMessage || defaultErrorMessage;
};

export const formatDate = (timestamp?: number) => {
  if (typeof timestamp === "undefined") return "- - -";
  // Convert timestamp to milliseconds and create a Date object
  const date = new Date(timestamp * 1000);

  // Extract the month, day, and year from the Date object
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Format the date as mm/dd/yyyy
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};
