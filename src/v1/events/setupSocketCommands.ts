import type { Sequelize } from 'sequelize'
import { AppDependencies } from '../../app'

import { changeTaskStatus } from './tasks/changeStatus/commands/changeStatus'
import { createSubTask } from './subTasks/create/commands/createSubTask'
import { createTask } from './tasks/create/commands/createTask'
import { joinTasksRoom } from './room/join/commands/tasks'
import { joinTaskDetailsRoom } from './room/join/commands/details'
import { listTasks } from './tasks/list/commands/list'
import { FindAllTasksCommand } from '../shared/commands'

export type SocketCommandsDependencies = {
  sequelize: Sequelize
  models: AppDependencies['models']
  commands: { findAllTasks: FindAllTasksCommand }
}

export const setupSocketCommands = (dependencies: SocketCommandsDependencies) => {
  const changeTaskStatusCommand = changeTaskStatus(dependencies.models)
  const createSubTaskCommand = createSubTask(dependencies.models)
  const createTaskCommand = createTask(dependencies.models)
  const joinTasksRoomCommand = joinTasksRoom(dependencies)
  const findTaskDetailsCommand = joinTaskDetailsRoom(dependencies.models)
  const listTasksCommand = listTasks(dependencies.commands)

  return {
    changeTaskStatusCommand,
    createSubTaskCommand,
    createTaskCommand,
    joinTasksRoomCommand,
    findTaskDetailsCommand,
    listTasksCommand,
  }
}

export type SocketCommands = ReturnType<typeof setupSocketCommands>
