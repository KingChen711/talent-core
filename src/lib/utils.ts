import { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error)
}
