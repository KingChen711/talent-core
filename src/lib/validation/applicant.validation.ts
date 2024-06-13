import { Gender } from '@prisma/client'
import { z } from 'zod'

export const createApplicantSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  phone: z.string().regex(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  bornYear: z.coerce.number().int().min(1900),
  cv: z.string(),
  personalIntroduction: z.string().optional()
})

export type TCreateApplicantSchema = z.infer<typeof createApplicantSchema>

export type TCreateApplicantErrors = {
  [key in keyof TCreateApplicantSchema]: string
}

export const searchCandidateEmailSchema = z.object({
  email: z.string().email()
})

export type TSearchCandidateEmailSchema = z.infer<typeof searchCandidateEmailSchema>

export const getApplicantsSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(5),
  search: z.string().catch(''),
  status: z.enum(['All', 'Screening', 'Testing', 'Interviewing', 'Saved', 'Approve', 'Reject']).catch('All'),
  sort: z
    .enum(['createdAt', '-createdAt', 'candidateName', '-candidateName', 'appliedJob', '-appliedJob'])
    .optional()
    .default('-createdAt')
})

export type TGetApplicantsSchema = z.infer<typeof getApplicantsSchema>
