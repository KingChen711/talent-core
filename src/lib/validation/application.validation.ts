import { Gender } from '@prisma/client'
import { z } from 'zod'

export const createApplicationSchema = z.object({
  createCandidate: z.boolean(),
  candidateEmail: z.string().email(),
  fullName: z.string().min(2),
  phone: z.string().regex(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/, 'Invalid phone number'),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  bornYear: z.coerce.number().int().min(1900)
})

export type TCreateApplicationSchema = z.infer<typeof createApplicationSchema>

export const searchCandidateEmailSchema = z.object({
  email: z.string().email()
})

export type TSearchCandidateEmailSchema = z.infer<typeof searchCandidateEmailSchema>

export const getApplicationsByRecruitmentDriveSchema = z.object({
  pageNumber: z.coerce.number().default(1),
  pageSize: z.coerce
    .number()
    .default(10)
    .transform((data) => Math.min(data, 50)),
  search: z.coerce.string().trim().optional(),
  status: z.enum(['All', 'Screening', 'Testing', 'Interviewing', 'Saved', 'Approve', 'Reject']).catch('All'),
  sort: z.enum(['createdAt', '-createdAt']).optional().default('createdAt')
})

export type TGetApplicationsByRecruitmentDriveSchema = z.infer<typeof getApplicationsByRecruitmentDriveSchema>
