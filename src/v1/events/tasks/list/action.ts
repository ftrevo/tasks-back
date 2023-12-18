import type { Socket } from 'socket.io'

// import { validateInboundParams } from './validation/inbound'
import { validateOutboundObject } from './validation/outbound'
import type { ListTasksCommand } from './commands/list'
import type { ErrorHandlerSocket } from '../../../../infra'

type ListTasksDependencies = {
  socket: Socket
  listTasksCommand: ListTasksCommand
  errorHandler: ErrorHandlerSocket
}

type ChangeStatusParams = boolean

// Created for filtering not used yet
export const listTasks =
  ({ socket, listTasksCommand, errorHandler }: ListTasksDependencies) =>
  async (message: ChangeStatusParams) => {
    try {
      // const filter = validateInboundParams(message)
      const tasks = await listTasksCommand() // f(ilter)

      const validTasks = validateOutboundObject(tasks)

      socket.emit('getTasks', validTasks)
    } catch (err) {
      errorHandler(err)
    }
  }
