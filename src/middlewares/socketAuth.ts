import type { Socket } from 'socket.io'
import { NotAuthorized, type AuthMechanism } from '../infra'

export const createSocketAuthMiddleware = (auth: AuthMechanism) => {
  return (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token

    try {
      socket.data = auth.verify(token)
    } catch (err) {
      socket.disconnect()
      next(new NotAuthorized('Invalid Credentials'))
    }
    next()
  }
}
