import type { Server as HttpServer } from 'http'
import type { Server as HttpsServer } from 'https'
import { Server, Socket } from 'socket.io'
import type { Sequelize } from 'sequelize'

import { createSocketAuthMiddleware, createStoreSocketMiddleware } from './middlewares'

import { setupSocketActions } from './v1/events'

import { type AuthMechanism, type Models } from './infra'
import { setupSharedCommands } from './v1/shared'

export type SocketDependencies = {
  models: Models
  auth: AuthMechanism
  server: HttpServer | HttpsServer
  sequelize: Sequelize
}

type SocketServerResult = {
  socketServer: Server
  socketDisconnect: (callback: () => void) => void
}

export const createSocketServer = ({ auth, server, models, sequelize }: SocketDependencies): SocketServerResult => {
  const commands = setupSharedCommands({ models, sequelize, auth })

  const socketActions = setupSocketActions({ models, sequelize, commands })

  const socketServer = new Server(server, {
    cors: {
      origin: '*', // FIXME add on config variables
      allowedHeaders: ['authorization'],
      credentials: true,
    },
  })

  socketServer.use(createSocketAuthMiddleware(auth))

  socketServer.on('connection', (socket: Socket) => {
    const connectedUserActions = socketActions(socket)

    socket.use(createStoreSocketMiddleware)

    socket.on('joinRoom', connectedUserActions.joinRoom)
    socket.on('leaveRoom', connectedUserActions.leaveRoom)

    socket.on('createTask', connectedUserActions.createTask)
    socket.on('changeStatus', connectedUserActions.changeTaskStatus)
    socket.on('filterTasks', connectedUserActions.listTasks)

    socket.on('createSubTask', connectedUserActions.createSubTask)

    socket.on('connect_error', (err) => {
      console.error('connect_error', err)
    })

    socket.on('error', (err) => {
      if (err && err.message === 'unauthorized event') {
        socket.disconnect()
      }
    })
  })

  const socketDisconnect = (callback: () => void) => {
    socketServer.close(callback)
  }

  return { socketServer, socketDisconnect }
}
