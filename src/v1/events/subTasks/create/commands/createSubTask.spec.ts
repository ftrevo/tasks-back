import { faker } from '@faker-js/faker'
import { createSubTask } from './createSubTask'

describe('createSubTask command', () => {
  const userId = faker.number.int()
  const name = faker.person.fullName()

  const message = {
    name: faker.lorem.word(),
    price: faker.number.int({ min: 1, max: 2147483647 }),
    taskId: faker.number.int(),
  }

  const mockTask = {
    get: jest.fn().mockReturnValue(false),
  }

  const mockDependencies = {
    SubTasks: {
      build: jest.fn(),
    },
    Tasks: {
      findByPk: jest.fn(),
    },
  }

  const subTaskMock = {
    ...message,
    userId,
    save: jest.fn(),
    toJSON: jest.fn(),
  }

  it('should create and save a subtask', async () => {
    subTaskMock.save.mockResolvedValueOnce(subTaskMock)
    subTaskMock.toJSON.mockReturnValueOnce({ ...message, userId })
    mockDependencies.SubTasks.build.mockReturnValueOnce(subTaskMock)
    mockDependencies.Tasks.findByPk.mockReturnValueOnce(mockTask)

    const createSubTaskCommand = createSubTask(mockDependencies as any)
    const result = await createSubTaskCommand({ message, userId, name })

    expect(result).toEqual({ ...message, userId, user: { name, id: userId } })
    expect(mockDependencies.Tasks.findByPk).toHaveBeenCalledWith(message.taskId)
    expect(mockTask.get).toHaveBeenCalledTimes(2)
    expect(mockTask.get).toHaveBeenCalledWith('done')
    expect(mockTask.get).toHaveBeenCalledWith('frozen')
    expect(mockDependencies.SubTasks.build).toHaveBeenCalledWith({ ...message, userId })
    expect(subTaskMock.save).toHaveBeenCalled()
    expect(subTaskMock.toJSON).toHaveBeenCalled()
  })

  it('should throw an error if no task is found', async () => {
    mockDependencies.Tasks.findByPk.mockReturnValueOnce(null)

    const createSubTaskCommand = createSubTask(mockDependencies as any)

    await expect(createSubTaskCommand({ message, userId, name })).rejects.toThrow('Task not found')
    expect(mockDependencies.Tasks.findByPk).toHaveBeenCalledWith(message.taskId)
    expect(mockTask.get).not.toHaveBeenCalled()
    expect(mockDependencies.SubTasks.build).not.toHaveBeenCalled()
    expect(subTaskMock.save).not.toHaveBeenCalled()
    expect(subTaskMock.toJSON).not.toHaveBeenCalled()
  })

  it.each(['done', 'frozen'])('should throw an error if task is %s', async (field) => {
    const mockTask = {
      get: jest.fn().mockImplementation((param) => {
        if (param === field) {
          return true
        }
        return false
      }),
    }

    mockDependencies.Tasks.findByPk.mockReturnValueOnce(mockTask)

    const createSubTaskCommand = createSubTask(mockDependencies as any)

    await expect(createSubTaskCommand({ message, userId, name })).rejects.toThrow(
      'Task is either done for frozen, therefore no subtasks can be added to it.'
    )
    expect(mockDependencies.Tasks.findByPk).toHaveBeenCalledWith(message.taskId)
    expect(mockTask.get).toHaveBeenCalledTimes(2)
    expect(mockTask.get).toHaveBeenCalledWith('done')
    expect(mockTask.get).toHaveBeenCalledWith('frozen')
    expect(mockDependencies.SubTasks.build).not.toHaveBeenCalled()
    expect(subTaskMock.save).not.toHaveBeenCalled()
    expect(subTaskMock.toJSON).not.toHaveBeenCalled()
  })

  it('should throw an error if save function throws an error', async () => {
    subTaskMock.save.mockImplementationOnce(() => {
      throw new Error('save error')
    })
    mockDependencies.SubTasks.build.mockReturnValueOnce(subTaskMock)
    mockDependencies.Tasks.findByPk.mockReturnValueOnce(mockTask)

    const createSubTaskCommand = createSubTask(mockDependencies as any)

    await expect(createSubTaskCommand({ message, userId, name })).rejects.toThrow('save error')
    expect(mockDependencies.Tasks.findByPk).toHaveBeenCalledWith(message.taskId)
    expect(mockTask.get).toHaveBeenCalledTimes(2)
    expect(mockTask.get).toHaveBeenCalledWith('done')
    expect(mockTask.get).toHaveBeenCalledWith('frozen')
    expect(mockDependencies.SubTasks.build).toHaveBeenCalledWith({ ...message, userId })
    expect(subTaskMock.save).toHaveBeenCalled()
    expect(subTaskMock.toJSON).not.toHaveBeenCalled()
  })
})
