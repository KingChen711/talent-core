// const createUserCandidateSchema = z.object({
// fullName: z.string().min(2),
// phone: z.string().regex(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
// gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
// bornYear: z.number().int().min(1900),
// avatar: z.string().catch('/images/default-avatar.png')
//   })

import { Gender } from '@prisma/client'
import { z } from 'zod'

export const createApplicationSchema = z.object({
  createCandidate: z.boolean(),
  candidateEmail: z.string().email(),
  fullName: z.string().min(2),
  // Vietnamese phone number regex
  phone: z.string().regex(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Invalid phone number'),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  bornYear: z.coerce.number().int().min(1900)
})

export type TCreateApplicationSchema = z.infer<typeof createApplicationSchema>

export const searchCandidateEmailSchema = z.object({
  email: z.string().email()
})

export type TSearchCandidateEmailSchema = z.infer<typeof searchCandidateEmailSchema>
