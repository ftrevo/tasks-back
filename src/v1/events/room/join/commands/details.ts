import type { SocketCommandsDependencies } from '../../../setupSocketCommands'

export const joinTaskDetailsRoom =
  ({ Tasks, Users, SubTasks }: SocketCommandsDependencies['models']) =>
  async (id: number) => {
    const task = await Tasks.findByPk(id, {
      include: [
        {
          model: Users,
          attributes: ['id', 'name'],
        },
        {
          model: SubTasks,
          attributes: ['id', 'name', 'price', 'updatedAt', 'taskId'],
          include: [
            {
              model: Users,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    })

    return task
  }

export type JoinTaskDetailsRoomCommnd = ReturnType<typeof joinTaskDetailsRoom>
