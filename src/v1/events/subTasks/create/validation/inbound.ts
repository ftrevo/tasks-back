import { z } from 'zod'

export const createSubTaskInboundSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().gte(0).lte(2147483647).optional(),
  taskId: z.coerce.number().int().gte(0),
})

export type CreateSubTaskInbound = z.infer<typeof createSubTaskInboundSchema>

export const validateInboundParams = (params: CreateSubTaskInbound) => {
  return createSubTaskInboundSchema.parse(params)
}
