import type { Socket } from 'socket.io'

import { validateInboundParams } from './validation/inbound'
import { validateOutboundObject } from './validation/outbound'
import type { CreateTaskCommand } from './commands/createTask'
import { ErrorHandlerSocket } from '../../../../infra'

type CreateTaskDependencies = {
  socket: Socket
  createTaskCommand: CreateTaskCommand
  errorHandler: ErrorHandlerSocket
}

type CreateTaskParams = {
  name: string
  price?: number
}

export const createTask =
  ({ socket, createTaskCommand, errorHandler }: CreateTaskDependencies) =>
  async (message: CreateTaskParams) => {
    try {
      const validMessage = validateInboundParams(message)

      const task = await createTaskCommand({ message: validMessage, userId: socket.data.id, name: socket.data.name })

      const createdTask = validateOutboundObject(task)
      socket.to('tasks').emit('newTask', createdTask)
      socket.emit('newTask', createdTask)
    } catch (err) {
      errorHandler(err)
    }
  }
