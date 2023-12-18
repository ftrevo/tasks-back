import { joinRoomInboundSchema, joinTaskDetailsRoomOutboundSchema, joinTasksRoomOutboundSchema } from './room'
import { createSubTaskInboundSchema, createSubTaskOutboundSchema } from './subTasks'
import {
  changeTaskStatusInboundSchema,
  changeTaskStatusOutboundSchema,
  createTaskInboundSchema,
  createTaskOutboundSchema,
  listTasksInboundSchema,
  listTasksOutboundSchema,
} from './tasks'

export const socketSchemas = {
  changeTaskStatusInboundSchema,
  changeTaskStatusOutboundSchema,
  createSubTaskInboundSchema,
  createSubTaskOutboundSchema,
  createTaskInboundSchema,
  createTaskOutboundSchema,
  joinRoomInboundSchema,
  joinTaskDetailsRoomOutboundSchema,
  joinTasksRoomOutboundSchema,
  listTasksInboundSchema,
  listTasksOutboundSchema,
}
