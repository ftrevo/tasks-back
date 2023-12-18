import { DataTypes, type InferAttributes, type InferCreationAttributes, type Model } from 'sequelize'

export interface Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  id: number
  name: string
  price?: number
  frozen: boolean
  done: boolean
  userId: number
}

export const tableName = 'tasks'

export const entityMapping = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  frozen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'users',
      },
      key: 'id',
    },
    allowNull: false,
  },
}
