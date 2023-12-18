import { faker } from '@faker-js/faker'

import { findAllTasks } from './findAllTasks'

describe('findAllTasks command', () => {
  const id = faker.number.int()

  const mockTask = {
    get: () => id,
    dataValues: {
      done: faker.datatype.boolean(),
      frozen: faker.datatype.boolean(),
      id,
      name: faker.lorem.word(),
      price: faker.number.int({ min: 1, max: 2147483647 }),
      subTasksPrice: faker.number.int({ min: 1 }),
      user: {
        id: faker.number.int({ min: 1 }),
        name: faker.person.fullName(),
      },
    },
  }

  const mockDependencies = {
    models: {
      Tasks: {
        findAll: jest.fn().mockResolvedValueOnce([mockTask]),
      },
      Users: {},
      SubTasks: {},
    },
    sequelize: {
      fn: jest.fn().mockReturnValue('fn'),
      col: jest.fn().mockReturnValue('col.subTasks.price'),
    },
  }

  beforeEach(jest.clearAllMocks)

  it('should return all tasks', async () => {
    const findAllTasksCommand = findAllTasks(mockDependencies as any)
    const result = await findAllTasksCommand()

    expect(result).toEqual({ [id]: mockTask.dataValues })
    expect(mockDependencies.models.Tasks.findAll).toHaveBeenCalledWith({
      attributes: [
        'id',
        'name',
        'price',
        'frozen',
        'done',
        'createdAt',
        'updatedAt',
        [mockDependencies.sequelize.fn('sum', mockDependencies.sequelize.col('subTasks.price')), 'subTasksPrice'],
      ],
      include: [
        {
          model: mockDependencies.models.Users,
          attributes: ['name', 'id'],
          required: true,
        },
        {
          model: mockDependencies.models.SubTasks,
          attributes: [],
        },
      ],
      group: ['tasks.id', 'user.id'],
    })
    expect(mockDependencies.sequelize.col).toHaveBeenCalledWith('subTasks.price')
    expect(mockDependencies.sequelize.fn).toHaveBeenCalledWith('sum', 'col.subTasks.price')
  })

  it('should return all tasks with no subTaskPrice', async () => {
    const { subTasksPrice, ...mockTaskWithNoSubTaskPrice } = mockTask.dataValues

    mockDependencies.models.Tasks.findAll.mockResolvedValueOnce([
      { ...mockTask, dataValues: mockTaskWithNoSubTaskPrice },
    ])

    const findAllTasksCommand = findAllTasks(mockDependencies as any)
    const result = await findAllTasksCommand()

    expect(result).toEqual({ [id]: mockTaskWithNoSubTaskPrice })
    expect(mockDependencies.models.Tasks.findAll).toHaveBeenCalledWith({
      attributes: [
        'id',
        'name',
        'price',
        'frozen',
        'done',
        'createdAt',
        'updatedAt',
        [mockDependencies.sequelize.fn('sum', mockDependencies.sequelize.col('subTasks.price')), 'subTasksPrice'],
      ],
      include: [
        {
          model: mockDependencies.models.Users,
          attributes: ['name', 'id'],
          required: true,
        },
        {
          model: mockDependencies.models.SubTasks,
          attributes: [],
        },
      ],
      group: ['tasks.id', 'user.id'],
    })
    expect(mockDependencies.sequelize.col).toHaveBeenCalledWith('subTasks.price')
    expect(mockDependencies.sequelize.fn).toHaveBeenCalledWith('sum', 'col.subTasks.price')
  })

  it('should return an empty object if no tasks are found', async () => {
    mockDependencies.models.Tasks.findAll.mockResolvedValueOnce([])

    const findAllTasksCommand = findAllTasks(mockDependencies as any)
    const result = await findAllTasksCommand()

    expect(result).toEqual({})
    expect(mockDependencies.models.Tasks.findAll).toHaveBeenCalledWith({
      attributes: [
        'id',
        'name',
        'price',
        'frozen',
        'done',
        'createdAt',
        'updatedAt',
        [mockDependencies.sequelize.fn('sum', mockDependencies.sequelize.col('subTasks.price')), 'subTasksPrice'],
      ],
      include: [
        {
          model: mockDependencies.models.Users,
          attributes: ['name', 'id'],
          required: true,
        },
        {
          model: mockDependencies.models.SubTasks,
          attributes: [],
        },
      ],
      group: ['tasks.id', 'user.id'],
    })
    expect(mockDependencies.sequelize.col).toHaveBeenCalledWith('subTasks.price')
    expect(mockDependencies.sequelize.fn).toHaveBeenCalledWith('sum', 'col.subTasks.price')
  })

  it('should throw an error if findAll throws', async () => {
    mockDependencies.models.Tasks.findAll.mockImplementationOnce(() => {
      throw new Error('findAll error')
    })

    const findAllTasksCommand = findAllTasks(mockDependencies as any)

    await expect(findAllTasksCommand()).rejects.toThrow('findAll error')
  })
})
