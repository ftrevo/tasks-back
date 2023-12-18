import { Socket } from 'socket.io'

import { leaveRoom } from './room/leave'
import { joinRoom } from './room/join/action'
import { changeTaskStatus } from './tasks/changeStatus'
import { createTask } from './tasks/create'
import { createSubTask } from './subTasks/create'
import { listTasks } from './tasks/list'
import { setupSocketCommands } from './setupSocketCommands'
import { Sequelize } from 'sequelize'
import { AppDependencies } from '../../app'
import { errorHandlerSocket } from '../../infra'
import { FindAllTasksCommand } from '../shared/commands'

export type SetupSocketActionsDependencies = {
  sequelize: Sequelize
  models: AppDependencies['models']
  commands: { findAllTasks: FindAllTasksCommand }
}

export const setupSocketActions = (dependencies: SetupSocketActionsDependencies) => {
  const {
    changeTaskStatusCommand,
    createSubTaskCommand,
    createTaskCommand,
    joinTasksRoomCommand,
    findTaskDetailsCommand,
    listTasksCommand,
  } = setupSocketCommands(dependencies)

  return (socket: Socket) => {
    const errorHandler = errorHandlerSocket(socket)

    return {
      changeTaskStatus: changeTaskStatus({ socket, changeTaskStatusCommand, errorHandler }),
      createSubTask: createSubTask({ socket, createSubTaskCommand, errorHandler }),
      createTask: createTask({ socket, createTaskCommand, errorHandler }),
      joinRoom: joinRoom({ socket, joinTasksRoomCommand, findTaskDetailsCommand, errorHandler }),
      leaveRoom: leaveRoom({ socket, errorHandler }),
      listTasks: listTasks({ socket, listTasksCommand, errorHandler }),
    }
  }
}
