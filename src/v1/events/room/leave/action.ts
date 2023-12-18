import { Socket } from 'socket.io'
import { validateInboundParams } from './validation/inbound'
import { ErrorHandlerSocket } from '../../../../infra'

type LeaveRoomDependencies = {
  socket: Socket
  errorHandler: ErrorHandlerSocket
}

export const leaveRoom =
  ({ socket, errorHandler }: LeaveRoomDependencies) =>
  async (leaveRoomParams: string) => {
    try {
      const validRoom = validateInboundParams(leaveRoomParams)

      socket.leave(validRoom)
    } catch (err) {
      errorHandler(err)
    }
  }
