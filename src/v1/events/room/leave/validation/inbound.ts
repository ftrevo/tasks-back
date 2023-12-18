import { z } from 'zod'

export const leaveRoomInboundSchema = z.string().refine((value) => /^tasks(\/\d+)?$/.test(value), {
  message: 'Room must start with "tasks" and can be followed by / and an integer number',
})

export type LeaveRoomInboundSchema = z.infer<typeof leaveRoomInboundSchema>

export const validateInboundParams = (params: LeaveRoomInboundSchema) => {
  return leaveRoomInboundSchema.parse(params)
}
