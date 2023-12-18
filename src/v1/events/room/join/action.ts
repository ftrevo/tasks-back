import { Socket } from 'socket.io'
import { validateInboundParams } from './validation/inbound'
import type { JoinTasksRoomCommand } from './commands/tasks'
import type { JoinTaskDetailsRoomCommnd } from './commands/details'
import { validateOutboundObject } from './validation/outbound'
import { ErrorHandlerSocket } from '../../../../infra'

type JoinRoomDependencies = {
  socket: Socket
  joinTasksRoomCommand: JoinTasksRoomCommand
  findTaskDetailsCommand: JoinTaskDetailsRoomCommnd
  errorHandler: ErrorHandlerSocket
}

export const joinRoom =
  ({ socket, joinTasksRoomCommand, findTaskDetailsCommand, errorHandler }: JoinRoomDependencies) =>
  async (joinRoomParams: string) => {
    try {
      const room = validateInboundParams(joinRoomParams)
      socket.join(room)

      if (room === 'tasks') {
        const taskList = await joinTasksRoomCommand()

        const validatedTasks = validateOutboundObject('all', taskList)
        socket.emit('getTasks', validatedTasks)
        return
      }

      const details = await findTaskDetailsCommand(Number(room.split('/').pop()))
      const validDetails = validateOutboundObject('single', details)
      socket.emit(room, validDetails)
    } catch (err) {
      errorHandler(err)
    }
  }
