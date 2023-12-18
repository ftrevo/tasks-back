import { z } from 'zod'

export const changeTaskStatusOutboundSchema = z.object({
  id: z.coerce.number().int().gt(0),
  status: z.boolean(),
  field: z.union([z.literal('frozen'), z.literal('done')]),
})

export type ChangeTaskStatusOutboundSchema = z.infer<typeof changeTaskStatusOutboundSchema>

export const validateOutboundObject = (params: ChangeTaskStatusOutboundSchema) => {
  return changeTaskStatusOutboundSchema.parse(params)
}
