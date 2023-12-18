import { DataTypes, type InferAttributes, type InferCreationAttributes, type Model } from 'sequelize'

export interface SubTask extends Model<InferAttributes<SubTask>, InferCreationAttributes<SubTask>> {
  id: number
  name: string
  price?: number
  frozen: boolean
  done: boolean
  userId: number
}

export const tableName = 'subTasks'

export const entityMapping = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
