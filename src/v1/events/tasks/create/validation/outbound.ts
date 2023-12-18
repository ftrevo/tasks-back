import { z } from 'zod'

export const createTaskOutboundSchema = z.object({
  id: z.number().int().gt(0),
  done: z.boolean(),
  frozen: z.boolean(),
  name: z.string().min(1),
  price: z.number().int().gte(0).optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    name: z.string().min(1),
    id: z.number().int().gt(0),
  }),
})

export type CreateTaskOutboundMessage = z.infer<typeof createTaskOutboundSchema>

export const validateOutboundObject = (params: CreateTaskOutboundMessage) => {
  return createTaskOutboundSchema.parse(params)
}
