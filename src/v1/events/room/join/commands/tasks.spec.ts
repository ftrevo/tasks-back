import { joinTasksRoom } from './tasks'

describe('joinTasksRoom command', () => {
  const mockDependencies = {
    commands: {
      findAllTasks: jest.fn(),
    },
  }

  beforeEach(jest.clearAllMocks)

  it('should return all tasks', async () => {
    const findAllTasksReturnedValue = {}
    mockDependencies.commands.findAllTasks.mockReturnValue(findAllTasksReturnedValue)

    const joinTasksRoomCommand = joinTasksRoom(mockDependencies as any)
    const result = joinTasksRoomCommand()

    expect(result).toEqual(findAllTasksReturnedValue)
    expect(mockDependencies.commands.findAllTasks).toHaveBeenCalled()
  })

  it('should throw an error if findAllTasks throws', async () => {
    mockDependencies.commands.findAllTasks.mockImplementationOnce(() => {
      throw new Error('findAllTasks error')
    })

    const joinTasksRoomCommand = joinTasksRoom(mockDependencies as any)
    expect(() => joinTasksRoomCommand()).toThrow('findAllTasks error')
  })
})
