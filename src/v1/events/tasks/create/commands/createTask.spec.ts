import { faker } from '@faker-js/faker'
import { createTask } from './createTask'

describe('createTask command', () => {
  const userId = faker.number.int()
  const name = faker.person.fullName()

  const message = {
    name: faker.lorem.word(),
    price: faker.number.int({ min: 1, max: 2147483647 }),
  }

  const taskMock = {
    ...message,
    save: jest.fn(),
    toJSON: jest.fn().mockReturnValue({ ...message, userId }),
  }

  const mockDependencies = {
    Tasks: {
      build: jest.fn().mockReturnValue({ ...taskMock, userId }),
    },
  }

  it('should create and save a task', async () => {
    taskMock.save.mockReturnValue({ ...taskMock, userId })

    const createTaskCommand = createTask(mockDependencies as any)
    const result = await createTaskCommand({ message, userId, name })

    expect(result).toEqual({ ...message, userId, user: { name, id: userId } })
    expect(mockDependencies.Tasks.build).toHaveBeenCalledWith({ ...message, userId })
    expect(taskMock.save).toHaveBeenCalled()
    expect(taskMock.toJSON).toHaveBeenCalled()
  })

  it('should throw an error if save function throws an error', async () => {
    taskMock.save.mockImplementationOnce(() => {
      throw new Error('save error')
    })

    const createTaskCommand = createTask(mockDependencies as any)
    await expect(createTaskCommand({ message, userId, name })).rejects.toThrow('save error')

    expect(mockDependencies.Tasks.build).toHaveBeenCalledWith({ ...message, userId })
    expect(taskMock.save).toHaveBeenCalled()
    expect(taskMock.toJSON).not.toHaveBeenCalled()
  })
})
