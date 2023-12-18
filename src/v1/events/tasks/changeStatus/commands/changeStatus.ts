import { Forbidden, NotFoundError, type Task } from '../../../../../infra'
import type { SocketCommandsDependencies } from '../../../setupSocketCommands'
import { ChangeTaskStatusInboundSchema } from '../validation/inbound'

type ChangeTaskStatus = {
  message: ChangeTaskStatusInboundSchema
  userId: number
}

export const changeTaskStatus =
  ({ Tasks }: SocketCommandsDependencies['models']) =>
  async ({ message: { id, field, status }, userId }: ChangeTaskStatus) => {
    const task = (await Tasks.findByPk(id)) as Task

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    if (task.userId !== userId) {
      throw new Forbidden('Only the owner can update a task')
    }

    task[field] = status

    await task.save()

    return { id, status, field }
  }

export type ChangeTaskStatusCommand = ReturnType<typeof changeTaskStatus>
