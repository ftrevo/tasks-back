import { faker } from '@faker-js/faker'
import { changeTaskStatus } from './changeStatus'
import { Forbidden } from '../../../../../infra'

describe('changeTaskStatus command', () => {
  const mockDependencies = {
    Tasks: {
      findByPk: jest.fn(),
    },
  }

  const status = faker.datatype.boolean()

  const mockTask = {
    save: jest.fn(),
    id: faker.number.int({ min: 1 }),
    userId: faker.number.int({ max: 100 }),
    done: !status,
    frozen: status,
  }

  it('should update done task status', async () => {
    const field = 'done'

    const newStatus = !mockTask.done

    mockDependencies.Tasks.findByPk.mockResolvedValueOnce(mockTask)

    const changeTaskStatusCommand = changeTaskStatus(mockDependencies as any)
    const result = await changeTaskStatusCommand({
      message: { id: mockTask.id, field, status: newStatus },
      userId: mockTask.userId,
    })

    expect(result).toEqual({ id: mockTask.id, field, status: newStatus })
    expect(mockTask.save).toHaveBeenCalled()
  })

  it('should update frozen task status', async () => {
    const field = 'frozen'

    const newStatus = !mockTask.frozen

    mockDependencies.Tasks.findByPk.mockResolvedValueOnce(mockTask)

    const changeTaskStatusCommand = changeTaskStatus(mockDependencies as any)
    const result = await changeTaskStatusCommand({
      message: { id: mockTask.id, field, status: newStatus },
      userId: mockTask.userId,
    })

    expect(result).toEqual({ id: mockTask.id, field, status: newStatus })
    expect(mockTask.save).toHaveBeenCalled()
  })

  it('should throw a not found error if task does not exist', async () => {
    mockDependencies.Tasks.findByPk.mockResolvedValueOnce(null)

    const changeTaskStatusCommand = changeTaskStatus(mockDependencies as any)

    await expect(
      changeTaskStatusCommand({
        message: { id: mockTask.id, field: 'done', status: false },
        userId: mockTask.userId,
      })
    ).rejects.toThrow('Task not found')
  })

  it('should throw a forbidden error if user is not the owner', async () => {
    mockDependencies.Tasks.findByPk.mockResolvedValueOnce({ mockTask, userId: mockTask.userId + 1 })

    const changeTaskStatusCommand = changeTaskStatus(mockDependencies as any)

    await expect(
      changeTaskStatusCommand({
        message: { id: mockTask.id, field: 'done', status: false },
        userId: mockTask.userId,
      })
    ).rejects.toThrow(new Forbidden('Only the owner can update a task'))
  })

  it('should throw an error if save throws', async () => {
    mockTask.save.mockImplementationOnce(() => {
      throw new Error('save error')
    })

    mockDependencies.Tasks.findByPk.mockResolvedValueOnce(mockTask)

    const changeTaskStatusCommand = changeTaskStatus(mockDependencies as any)

    await expect(
      changeTaskStatusCommand({
        message: { id: mockTask.id, field: 'frozen', status: false },
        userId: mockTask.userId,
      })
    ).rejects.toThrow('save error')
    expect(mockTask.save).toHaveBeenCalled()
  })
})
