import { Socket } from 'socket.io'
import { errorHandler } from './errorHandler'
import { getStore } from '..'

export const errorHandlerSocket = (socket: Socket) => (error: any) => {
  const { logger } = getStore()

  const { message } = errorHandler(error, logger)

  return socket.emit('newError', message)
}

export type ErrorHandlerSocket = ReturnType<typeof errorHandlerSocket>
