import { BusinessError, NotFoundError } from '../../../../../infra'
import type { SocketCommandsDependencies } from '../../../setupSocketCommands'
import { CreateSubTaskInbound } from '../validation/inbound'

type CreateSubTask = {
  message: CreateSubTaskInbound
  userId: number
  name: string
}

// MUDAR O TYPING PRA RECEBER SÓ O MODEL NECESSÁRIO
export const createSubTask =
  ({ SubTasks, Tasks }: SocketCommandsDependencies['models']) =>
  async ({ message, userId, name }: CreateSubTask) => {
    const task = await Tasks.findByPk(message.taskId)

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    const done = task.get('done')
    const frozen = task.get('frozen')

    if (frozen || done) {
      throw new BusinessError('Task is either done for frozen, therefore no subtasks can be added to it.')
    }

    const subTask = SubTasks.build({ ...message, userId })

    const savedSubTask = await subTask.save()

    return { ...savedSubTask.toJSON(), user: { name, id: userId } }
  }

export type CreateSubTaskCommand = ReturnType<typeof createSubTask>
