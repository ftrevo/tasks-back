import { z } from 'zod'

export const joinRoomInboundSchema = z.string().refine((value) => /^tasks(\/\d+)?$/.test(value), {
  message: 'Room must start with "tasks" and can be followed by / and an integer number',
})

export type JoinRoomInboundSchema = z.infer<typeof joinRoomInboundSchema>

export const validateInboundParams = (params: JoinRoomInboundSchema) => {
  return joinRoomInboundSchema.parse(params)
}
