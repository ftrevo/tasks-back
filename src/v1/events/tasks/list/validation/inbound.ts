import { z } from 'zod'

export const listTasksInboundSchema = z.object({
  text: z.string().optional(),
})

export type ListTasksInboundSchema = z.infer<typeof listTasksInboundSchema>

export const validateInboundParams = (params: ListTasksInboundSchema) => {
  return listTasksInboundSchema.parse(params)
}
