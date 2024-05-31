import { z } from 'zod'

export const getRecruitmentDrivesSchema = z.object({
  pageNumber: z.coerce.number().catch(1),
  pageSize: z.coerce
    .number()
    .default(10)
    .transform((data) => Math.min(data, 50))
    .catch(5),
  search: z.string().catch(''),
  status: z.enum(['all', 'opening', 'closed']).catch('all'),
  sort: z
    .enum(['startDate', '-startDate', 'endDate', '-endDate', 'name', '-name', 'createdAt', '-createdAt'])
    .catch('-createdAt')
})

export type TGetRecruitmentDrivesSchema = z.infer<typeof getRecruitmentDrivesSchema>
