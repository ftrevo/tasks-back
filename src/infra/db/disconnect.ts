import { Sequelize } from 'sequelize'

export const disconnect = (sequelize: Sequelize) => async () => {
  await sequelize.close
}
