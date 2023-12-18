import type { SocketCommandsDependencies } from '../../../setupSocketCommands'

export const listTasks =
  ({ findAllTasks }: SocketCommandsDependencies['commands']) =>
  () => {
    return findAllTasks()
  }

export type ListTasksCommand = ReturnType<typeof listTasks>
