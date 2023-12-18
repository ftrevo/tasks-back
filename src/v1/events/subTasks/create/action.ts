import type { Socket } from 'socket.io'

import { validateInboundParams } from './validation/inbound'
import { validateOutboundObject } from './validation/outbound'
import type { CreateSubTaskCommand } from './commands/createSubTask'
import { ErrorHandlerSocket } from '../../../../infra'

type CreateSubTaskDependencies = {
  socket: Socket
  createSubTaskCommand: CreateSubTaskCommand
  errorHandler: ErrorHandlerSocket
}

type CreateSubTaskParams = {
  name: string
  taskId: number
  price?: number
}

export const createSubTask =
  ({ socket, createSubTaskCommand, errorHandler }: CreateSubTaskDependencies) =>
  async (message: CreateSubTaskParams) => {
    try {
      const validMessage = validateInboundParams(message)

      const subTask = await createSubTaskCommand({
        message: validMessage,
        userId: socket.data.id,
        name: socket.data.name,
      })

      const createdSubTask = validateOutboundObject(subTask)

      socket.to(`tasks/${createdSubTask.taskId}`).emit('newSubTask', createdSubTask)
      socket.emit('newSubTask', createdSubTask)

      if (createdSubTask.price) {
        socket
          .to('tasks')
          .emit('addSubTask', { action: 'add', taskId: createdSubTask.taskId, price: createdSubTask.price })
      }
    } catch (err) {
      errorHandler(err)
    }
  }
