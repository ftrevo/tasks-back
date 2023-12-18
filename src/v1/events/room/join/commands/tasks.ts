import type { SocketCommandsDependencies } from '../../../setupSocketCommands'

export const joinTasksRoom =
  ({ commands: { findAllTasks } }: SocketCommandsDependencies) =>
  () => {
    return findAllTasks()
  }

export type JoinTasksRoomCommand = ReturnType<typeof joinTasksRoom>
