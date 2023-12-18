import { z } from 'zod'

const basicData = z.object({
  id: z.number().int().gt(0),
  name: z.string().min(1),
  price: z.number().int().gte(0).optional().nullable(),
  updatedAt: z.date(),
  user: z.object({
    name: z.string().min(1),
    id: z.number().int().gt(0),
  }),
})

export const joinTasksRoomOutboundSchema = z.record(
  basicData
    .extend({
      done: z.boolean(),
      frozen: z.boolean(),
      subTasksPrice: z.number().optional().nullable(),
    })
    .optional()
)

export const joinTaskDetailsRoomOutboundSchema = basicData.extend({
  frozen: z.boolean(),
  done: z.boolean(),
  subTasks: z.array(basicData.optional()),
})

export type JoinTasksRoomOutboundMessage = z.infer<typeof joinTasksRoomOutboundSchema>
export type JoinTaskDetailsRoomOutboundMessage = z.infer<typeof joinTaskDetailsRoomOutboundSchema>

export const validateOutboundObject = (validation: 'all' | 'single', params: any) => {
  if (validation === 'all') {
    return joinTasksRoomOutboundSchema.parse(params)
  }
  return joinTaskDetailsRoomOutboundSchema.parse(params)
}
