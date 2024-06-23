import { z } from 'zod'

export const updateWishSchema = z.object({
  isApprove: z.coerce.boolean(),
  type: z.enum(['TestSessionWish', 'InterviewSessionWish', 'ReceiveJobSessionWish'])
})

export type TUpdateWishSchema = z.infer<typeof updateWishSchema>

export const requestChangeTestDate = z.object({
  wishDate: z.coerce.date().refine((data) => {
    const now = new Date().getTime()
    return data.getTime() > now
  }, 'Invalid date'),
  reason: z.string()
})

export type TRequestChangeTestDate = z.infer<typeof requestChangeTestDate>

export const requestChangeReceiveJobDate = z.object({
  wishDate: z.coerce.date().refine((data) => {
    const now = new Date().getTime()
    return data.getTime() > now
  }, 'Invalid date'),
  reason: z.string()
})

export type TRequestChangeReceiveJobDate = z.infer<typeof requestChangeReceiveJobDate>

export const requestChangeInterviewDate = z.object({
  wishDate: z.coerce.date().refine((data) => {
    const now = new Date().getTime()
    return data.getTime() > now
  }, 'Invalid date'),
  method: z.enum(['Online', 'Offline']),
  reason: z.string()
})

export type TRequestChangeInterviewDate = z.infer<typeof requestChangeInterviewDate>
