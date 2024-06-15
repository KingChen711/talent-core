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

export const scheduleTestExamSchema = z.object({
  testDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const threeDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3)
    return data.getTime() >= threeDaysLater.getTime()
  }, 'Test date must be after today at least 3 day'),
  testExamCode: z.string()
})

export type TScheduleTestExamSchema = z.infer<typeof scheduleTestExamSchema>

export const scheduleInterviewSchema = z.object({
  interviewDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const threeDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3)
    return data.getTime() >= threeDaysLater.getTime()
  }, 'Interview date must be after today at least 3 day'),
  location: z.string()
})

export type TScheduleInterviewSchema = z.infer<typeof scheduleInterviewSchema>

export const approveApplicantSchema = z.object({
  receiveJobDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const threeDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3)
    return data.getTime() >= threeDaysLater.getTime()
  }, 'Interview date must be after today at least 3 day'),
  guide: z.string()
})

export type TApproveApplicantSchema = z.infer<typeof approveApplicantSchema>
