import { Sequelize } from 'sequelize'

import * as subTasks from './subTasks'
import * as tasks from './tasks'
import * as users from './users'
import { EncryptMechanism } from '../../encryptMechanism'

const defaultOptions = {
  freezeTableName: false,
}

export const createModels = (sequelize: Sequelize, encryptMethod: EncryptMechanism) => {
  const Users = sequelize.define(users.tableName, users.entityMapping, {
    ...defaultOptions,
    hooks: users.hooks(encryptMethod),
  })

  const Tasks = sequelize.define(tasks.tableName, tasks.entityMapping, defaultOptions)

  const SubTasks = sequelize.define(subTasks.tableName, subTasks.entityMapping, defaultOptions)

  Users.hasMany(Tasks)
  Tasks.belongsTo(Users)

  Users.hasMany(SubTasks)
  SubTasks.belongsTo(Users)
  Tasks.hasMany(SubTasks)
  SubTasks.belongsTo(Tasks)

  return { Tasks, Users, SubTasks }
}
