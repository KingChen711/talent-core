import { z } from 'zod'

export const getUsersSchema = z.object({
  pageNumber: z.coerce.number().catch(1),
  pageSize: z.coerce
    .number()
    .catch(5)
    .transform((data) => Math.min(data, 50)),
  search: z.coerce.string().trim().catch(''),
  role: z.enum(['All', 'Candidate', 'Employee']).catch('All'),
  sort: z.enum(['email', '-email', 'fullName', '-fullName', 'bornYear', '-bornYear', 'phone', '-phone']).catch('email')
})

export type TGetUsersSchema = z.infer<typeof getUsersSchema>
