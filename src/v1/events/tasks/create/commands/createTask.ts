import type { SocketCommandsDependencies } from '../../../setupSocketCommands'
import { CreateTaskInbound } from '../validation/inbound'

type CreateTask = {
  message: CreateTaskInbound
  userId: number
  name: string
}
// MUDAR O TYPING PRA RECEBER SÓ O MODEL NECESSÁRIO
export const createTask =
  ({ Tasks }: SocketCommandsDependencies['models']) =>
  async ({ message, userId, name }: CreateTask) => {
    const task = Tasks.build({ ...message, userId })

    const savedTask = await task.save()

    return { ...savedTask.toJSON(), user: { name, id: userId } }
  }

export type CreateTaskCommand = ReturnType<typeof createTask>
