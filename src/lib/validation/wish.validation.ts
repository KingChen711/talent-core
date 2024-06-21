import { z } from 'zod'

export const updateWishSchema = z.object({
  isApprove: z.coerce.boolean(),
  type: z.enum(['TestSessionWish', 'InterviewSessionWish', 'ReceiveJobWish'])
})

export type TUpdateWishSchema = z.infer<typeof updateWishSchema>

export const requestChangeTestDate = z.object({
  wishDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const oneDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    return data.getTime() >= oneDaysLater.getTime()
  }, 'Wish date must be after today at least 1 day'),
  reason: z.string()
})

export type TRequestChangeTestDate = z.infer<typeof requestChangeTestDate>

export const requestChangeReceiveJobDate = z.object({
  wishDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const oneDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    return data.getTime() >= oneDaysLater.getTime()
  }, 'Wish date must be after today at least 1 day'),
  reason: z.string()
})

export type TRequestChangeReceiveJobDate = z.infer<typeof requestChangeReceiveJobDate>

export const requestChangeInterviewDate = z.object({
  wishDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const oneDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    return data.getTime() >= oneDaysLater.getTime()
  }, 'Wish date must be after today at least 1 day'),
  method: z.enum(['Online', 'Offline']),
  reason: z.string()
})

export type TRequestChangeInterviewDate = z.infer<typeof requestChangeInterviewDate>
