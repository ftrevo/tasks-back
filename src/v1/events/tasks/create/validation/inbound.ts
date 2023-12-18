import { z } from 'zod'

export const createTaskInboundSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().gte(0).lte(2147483647).optional(),
})

export type CreateTaskInbound = z.infer<typeof createTaskInboundSchema>

export const validateInboundParams = (params: CreateTaskInbound) => {
  return createTaskInboundSchema.parse(params)
}
