import { QueryInterface, DataTypes } from 'sequelize'

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('subTasks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'tasks',
        },
        key: 'id',
      },
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  })
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('subTasks')
}

export default {
  up,
  down,
}
