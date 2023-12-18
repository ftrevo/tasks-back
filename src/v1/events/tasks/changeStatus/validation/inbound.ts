import { z } from 'zod'

export const changeTaskStatusInboundSchema = z.object({
  id: z.coerce.number().int().gt(0),
  status: z.boolean(),
  field: z.union([z.literal('frozen'), z.literal('done')]),
})

export type ChangeTaskStatusInboundSchema = z.infer<typeof changeTaskStatusInboundSchema>

export const validateInboundParams = (params: ChangeTaskStatusInboundSchema) => {
  return changeTaskStatusInboundSchema.parse(params)
}
