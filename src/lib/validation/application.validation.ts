import { Gender } from '@prisma/client'
import { z } from 'zod'

export const createApplicationSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  phone: z.string().regex(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  bornYear: z.coerce.number().int().min(1900),
  cv: z.string(),
  personalIntroduction: z.string().optional()
})

export type TCreateApplicationSchema = z.infer<typeof createApplicationSchema>

export type TCreateApplicationErrors = {
  [key in keyof TCreateApplicationSchema]: string
}

export const searchCandidateEmailSchema = z.object({
  email: z.string().email()
})

export type TSearchCandidateEmailSchema = z.infer<typeof searchCandidateEmailSchema>

export const getApplicationsSchema = z.object({
  pageNumber: z.number().catch(1),
  pageSize: z.number().catch(5),
  search: z.string().catch(''),
  status: z.enum(['All', 'Screening', 'Testing', 'Interviewing', 'Saved', 'Approve', 'Reject']).catch('All'),
  sort: z
    .enum(['createdAt', '-createdAt', 'candidateName', '-candidateName', 'appliedJob', '-appliedJob'])
    .catch('-createdAt')
})

export type TGetApplicationsSchema = z.infer<typeof getApplicationsSchema>

export const scheduleTestExamSchema = z.object({
  testDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const oneDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    return data.getTime() >= oneDaysLater.getTime()
  }, 'Test date must be after today at least 1 day'),
  testExamCode: z.string()
})

export type TScheduleTestExamSchema = z.infer<typeof scheduleTestExamSchema>

export const scheduleInterviewSchema = z.object({
  interviewDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const oneDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    return data.getTime() >= oneDaysLater.getTime()
  }, 'Interview date must be after today at least 1 day'),
  location: z.string(),
  method: z.enum(['Online', 'Offline'])
})

export type TScheduleInterviewSchema = z.infer<typeof scheduleInterviewSchema>

export const approveApplicationSchema = z.object({
  receiveJobDate: z.coerce.date().refine((data) => {
    const now = new Date()
    const oneDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    return data.getTime() >= oneDaysLater.getTime()
  }, 'Interview date must be after today at least 1 day'),
  location: z.string()
})

export type TApproveApplicationSchema = z.infer<typeof approveApplicationSchema>

export const getMyApplicationsSchema = z.object({
  pageNumber: z.coerce.number().catch(1),
  pageSize: z.coerce.number().catch(10),
  search: z.string().catch(''),
  status: z.enum(['All', 'Screening', 'Testing', 'Interviewing', 'Saved', 'Approve', 'Reject']).catch('All'),
  sort: z
    .enum(['createdAt', '-createdAt', 'appliedJob', '-appliedJob', 'recruitmentDrive', '-recruitmentDrive'])
    .catch('-createdAt')
})

export type TGetMyApplicationsSchema = z.infer<typeof getMyApplicationsSchema>
