import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { Color } from '~'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setStorageColor = (color?: Color) => {
  if (color) {
    window.localStorage.setItem('theme-color', color)
  }
}
export const getStorageColor = () => {
  const color = window.localStorage.getItem('theme-color')
  if (color) {
    return color as Color
  }
}

export function formatDate(input: string | number): string {
  const date = new Date(input)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatFullDate = (input: string | number) => {
  const date = new Date(input)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
