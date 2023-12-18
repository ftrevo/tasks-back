import { z } from 'zod'

export const createSubTaskOutboundSchema = z.object({
  id: z.number().int().gt(0),
  name: z.string().min(1),
  price: z.number().int().gte(0).optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    name: z.string().min(1),
    id: z.number().int().gt(0),
  }),
  taskId: z.number().int().gte(0),
})

export type CreateSubTaskOutboundMessage = z.infer<typeof createSubTaskOutboundSchema>

export const validateOutboundObject = (params: CreateSubTaskOutboundMessage) => {
  return createSubTaskOutboundSchema.parse(params)
}
