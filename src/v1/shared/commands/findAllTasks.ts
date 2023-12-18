import type { Sequelize } from 'sequelize'
import type { Models } from '../../../infra'

type TaskDTO = {
  id: number
  name: string
  price: number
  frozen: boolean
  done: boolean
  createdAt: Date
  updatedAt: Date
  subTasksPrice: number
  user: {
    id: number
    name: string
  }
}

type FindAllDependencies = {
  models: Models
  sequelize: Sequelize
}

export const findAllTasks =
  ({ models: { Tasks, Users, SubTasks }, sequelize }: FindAllDependencies) =>
  async () => {
    const tasks = await Tasks.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'frozen',
        'done',
        'createdAt',
        'updatedAt',
        [sequelize.fn('sum', sequelize.col('subTasks.price')), 'subTasksPrice'],
      ],
      include: [
        {
          model: Users,
          attributes: ['name', 'id'],
          required: true,
        },
        {
          model: SubTasks,
          attributes: [],
        },
      ],
      group: ['tasks.id', 'user.id'],
    })

    // Could be a map but due to a limitation on zod-openapi I'm using a object
    const record: {
      [x: string]: TaskDTO
    } = {}

    tasks.forEach((task) => {
      const subTasksPrice = task.dataValues.subTasksPrice ? Number(task.dataValues.subTasksPrice) : undefined

      record[`${task.get('id')}`] = {
        ...task.dataValues,
        subTasksPrice,
      }
    })

    return record
  }

export type FindAllTasksCommand = ReturnType<typeof findAllTasks>
