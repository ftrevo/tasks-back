import { QueryInterface } from 'sequelize'

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.addIndex('users', ['email'])
}

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeIndex('users', ['email'])
}

export default {
  up,
  down,
}
