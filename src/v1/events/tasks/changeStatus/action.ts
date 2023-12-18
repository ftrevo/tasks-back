import type { Socket } from 'socket.io'

import { validateInboundParams } from './validation/inbound'
import { validateOutboundObject } from './validation/outbound'
import type { ChangeTaskStatusCommand } from './commands/changeStatus'
import type { ErrorHandlerSocket } from '../../../../infra'

type ChangeStatusDependencies = {
  socket: Socket
  changeTaskStatusCommand: ChangeTaskStatusCommand
  errorHandler: ErrorHandlerSocket
}

type ChangeStatusParams = {
  id: number
  status: boolean
  field: 'done' | 'frozen'
}

export const changeTaskStatus =
  ({ socket, changeTaskStatusCommand, errorHandler }: ChangeStatusDependencies) =>
  async (message: ChangeStatusParams) => {
    try {
      const validMessage = validateInboundParams(message)
      const task = await changeTaskStatusCommand({ message: validMessage, userId: socket.data.id })

      const updatedTask = validateOutboundObject(task)

      socket.to('tasks').emit('statusUpdated', updatedTask)
      socket.to(`tasks/${task.id}`).emit('statusUpdated', updatedTask)
      socket.emit('statusUpdated', updatedTask)
    } catch (err) {
      errorHandler(err)
    }
  }
