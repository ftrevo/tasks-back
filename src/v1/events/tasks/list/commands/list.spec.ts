import { listTasks } from './list'

describe('listTasks command', () => {
  const mockDependencies = {
    findAllTasks: jest.fn(),
  }

  beforeEach(jest.clearAllMocks)

  it('should return all tasks', async () => {
    const findAllTasksReturnedValue = {}
    mockDependencies.findAllTasks.mockReturnValue(findAllTasksReturnedValue)

    const listTasksCommand = listTasks(mockDependencies as any)
    const result = listTasksCommand()

    expect(result).toEqual(findAllTasksReturnedValue)
    expect(mockDependencies.findAllTasks).toHaveBeenCalled()
  })

  it('should throw an error if findAllTasks throws', async () => {
    mockDependencies.findAllTasks.mockImplementationOnce(() => {
      throw new Error('findAllTasks error')
    })

    const listTasksCommand = listTasks(mockDependencies as any)
    expect(() => listTasksCommand()).toThrow('findAllTasks error')
  })
})
