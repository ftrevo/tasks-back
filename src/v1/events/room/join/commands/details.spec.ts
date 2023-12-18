import { faker } from '@faker-js/faker'
import { joinTaskDetailsRoom } from './details'
import { Models } from '../../../../../infra'

describe('joinTaskDetailsRoom command', () => {
  const id = faker.number.int()

  it('should return task details for a valid task ID', async () => {
    const mockTask = {
      id: faker.number.int({ min: 1 }),
      name: faker.lorem.word(),
      price: faker.number.int({ min: 1, max: 21474836 }),
      frozen: faker.datatype.boolean(),
      done: faker.datatype.boolean(),
      userId: faker.number.int(),
    }

    const mockModels = {
      Tasks: {
        findByPk: jest.fn().mockResolvedValueOnce(mockTask),
      },
      Users: {},
      SubTasks: {},
    }

    const joinTaskDetailsRoomCommand = joinTaskDetailsRoom(mockModels as any as Models)
    const result = await joinTaskDetailsRoomCommand(id)

    expect(result).toEqual(mockTask)
    expect(mockModels.Tasks.findByPk).toHaveBeenCalledWith(id, {
      include: [
        {
          model: mockModels.Users,
          attributes: ['id', 'name'],
        },
        {
          model: mockModels.SubTasks,
          attributes: ['id', 'name', 'price', 'updatedAt', 'taskId'],
          include: [
            {
              model: mockModels.Users,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    })
  })

  it('should return null if no task is found', async () => {
    const mockModels = {
      Tasks: {
        findByPk: jest.fn().mockResolvedValueOnce(null),
      },
      Users: {},
      SubTasks: {},
    }

    const joinTaskDetailsRoomCommand = joinTaskDetailsRoom(mockModels as any as Models)
    const result = await joinTaskDetailsRoomCommand(id)

    expect(result).toEqual(null)
    expect(mockModels.Tasks.findByPk).toHaveBeenCalledWith(id, {
      include: [
        {
          model: mockModels.Users,
          attributes: ['id', 'name'],
        },
        {
          model: mockModels.SubTasks,
          attributes: ['id', 'name', 'price', 'updatedAt', 'taskId'],
          include: [
            {
              model: mockModels.Users,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    })
  })

  it('should throw an error if findByPk throws', async () => {
    const mockModels = {
      Tasks: {
        findByPk: jest.fn().mockImplementationOnce(() => {
          throw new Error('findByPk error')
        }),
      },
      Users: {},
      SubTasks: {},
    }

    const joinTaskDetailsRoomCommand = joinTaskDetailsRoom(mockModels as any)

    await expect(joinTaskDetailsRoomCommand(id)).rejects.toThrow('findByPk error')
  })
})
