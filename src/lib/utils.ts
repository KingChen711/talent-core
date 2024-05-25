import { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error)
}

export function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Loại bỏ ký tự '#' nếu có
  hex = hex.replace(/^#/, '')

  // Chuyển đổi mã hex 3 ký tự thành 6 ký tự
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Chuyển đổi mã hex sang giá trị RGB
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

export function getContrastYIQ(hex: string): string {
  const { r, g, b } = hexToRgb(hex)

  // Tính toán độ sáng của màu
  const yiq = (r * 299 + g * 587 + b * 114) / 1000

  // Nếu độ sáng lớn hơn hoặc bằng 128, trả về màu đen, ngược lại trả về màu trắng
  return yiq >= 128 ? '#000000' : '#FFFFFF'
}
