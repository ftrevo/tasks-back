import { z } from 'zod'

export const listTasksOutboundSchema = z.record(
  z
    .object({
      id: z.number().int().gt(0),
      name: z.string().min(1),
      price: z.number().int().gte(0).optional().nullable(),
      updatedAt: z.date(),
      user: z.object({
        name: z.string().min(1),
      }),
      done: z.boolean(),
      frozen: z.boolean(),
      subTasksPrice: z.number().optional().nullable(),
    })
    .optional()
)

export type ListTasksOutboundMessage = z.infer<typeof listTasksOutboundSchema>

export const validateOutboundObject = (params: ListTasksOutboundMessage) => {
  return listTasksOutboundSchema.parse(params)
}
