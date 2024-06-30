import { z } from 'zod'

export const getRecruitmentDrivesSchema = z.object({
  pageNumber: z.coerce.number().catch(1),
  pageSize: z.coerce
    .number()
    .default(10)
    .transform((data) => Math.min(data, 50))
    .catch(5),
  search: z.string().catch(''),
  status: z.enum(['All', 'Open', 'Closed', 'Upcoming']).catch('All'),
  sort: z
    .enum([
      'startDate',
      '-startDate',
      'endDate',
      '-endDate',
      'name',
      '-name',
      'code',
      '-code',
      'createdAt',
      '-createdAt'
    ])
    .catch('-createdAt')
})

export type TGetRecruitmentDrivesSchema = z.infer<typeof getRecruitmentDrivesSchema>

export const mutationRecruitmentDriveSchema = z
  .object({
    id: z.string().optional(),
    code: z
      .string()
      .min(2)
      .max(50)
      .refine((value) => !/\s/.test(value), {
        message: 'Code must not contain any whitespace'
      }),
    name: z.string().min(2).max(50),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    description: z.string().optional()
  })
  .refine(
    (data) => {
      return data.endDate.getTime() > data.startDate.getTime()
    },
    {
      message: 'End date must be after Start date',
      path: ['endDate']
    }
  )

export type TMutationRecruitmentDriveSchema = z.infer<typeof mutationRecruitmentDriveSchema>

export type TMutateRecruitmentDriveErrors = {
  [key in keyof TMutationRecruitmentDriveSchema]: string
}
