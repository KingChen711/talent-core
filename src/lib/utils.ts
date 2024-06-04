import { BaseErrorResponse } from '@/types'
import axios, { AxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { differenceInDays, format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isFormError<T>(error: unknown): error is AxiosError<{ errors: T }> {
  return axios.isAxiosError(error)
}

export function isBaseError(error: unknown): error is AxiosError<BaseErrorResponse> {
  return axios.isAxiosError(error)
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

export function toDate(isoString: Date): string {
  return format(isoString, 'PPP')
}

export function getExampleQuestions() {
  const result = []

  for (let i = 0; i < 2; ++i) {
    const question = { id: uuidv4(), content: '', options: [] as { id: string; content: string; correct: boolean }[] }
    for (let j = 0; j < 4; ++j) {
      question.options.push({ id: uuidv4(), content: '', correct: j === 0 })
    }
    result.push(question)
  }

  return result
}

export function getOneExampleQuestion() {
  const question = { id: uuidv4(), content: '', options: [] as { id: string; content: string; correct: boolean }[] }
  for (let j = 0; j < 4; ++j) {
    question.options.push({ id: uuidv4(), content: '', correct: j === 0 })
  }

  return question
}

export function toDaysAgo(date: Date): string {
  const now = new Date()
  const daysDifference = differenceInDays(now, new Date(date))

  if (daysDifference === 0) {
    return 'Posted today'
  } else if (daysDifference === 1) {
    return 'Posted yesterday'
  } else {
    return `Posted ${daysDifference} days ago`
  }
}
