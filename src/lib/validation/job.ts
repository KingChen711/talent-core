import { z } from 'zod'

export const createJobSchema = z
  .object({
    code: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    description: z.string().optional(),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^$/, 'Invalid color'),
    icon: z.string().optional(),
    testExamIds: z.array(z.string()).catch([]),
    openInCurrentRecruitment: z.boolean(),
    quantityInCurrentRecruitment: z.number().int().min(1).optional()
  })
  .refine(
    (data) => {
      return (
        !data.openInCurrentRecruitment ||
        (data.quantityInCurrentRecruitment &&
          Number.isInteger(data.quantityInCurrentRecruitment) &&
          data.quantityInCurrentRecruitment > 0)
      )
    },
    {
      path: ['quantityInCurrentRecruitment'],
      message: 'Number of candidates needed is invalid.'
    }
  )

export type TCreateJobSchema = z.infer<typeof createJobSchema>
