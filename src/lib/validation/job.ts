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
    quantityInCurrentRecruitment: z.coerce.number().int().optional()
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
      message: 'Number of candidates needed must be a number a greater than 0'
    }
  )

export type TCreateJobSchema = z.infer<typeof createJobSchema>

export type TCreateJobErrors = {
  [key in keyof TCreateJobSchema]: string
}

export const openJobSchema = z.object({
  quantityInCurrentRecruitment: z.coerce.number().int().min(1)
})

export type TOpenJobSchema = z.infer<typeof openJobSchema>
