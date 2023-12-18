import { DataTypes, type InferAttributes, type InferCreationAttributes, type Model } from 'sequelize'
import type { EncryptMechanism } from '../../encryptMechanism'

export interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id?: number
  name: string
  email: string
  password: string
  resetCode: string | null
  comparePassword: (candidate: string) => boolean
}

// Or import from migrations

export const tableName = 'users'

export const entityMapping = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  /*
   * In a real application I would add the reset code as an external table, that would have
   * the ID of the user as FK and PK, expiration timestamp and the code itself, and I would
   * add a trigger/cron (since PG doesn't have TTL expirations natively) to clear the records
   * after the specific time has expired.
   * But to keep things short and narrow the scope a little I will only add a reset code field
   * on the Users table and clean it after the password is updated.
   * Doing it this way would have implications such as on a data breach, users could have
   * their accounts stolen, so I do not recommend following this path.
   */
  resetCode: {
    type: DataTypes.STRING,
  },
}

export const hooks = (encryptMethod: EncryptMechanism) => ({
  beforeCreate: (user: User) => {
    user.password = encryptMethod.hashPassword(user.password)
  },
  beforeUpdate: (user: User) => {
    if (user.changed('password')) {
      user.password = encryptMethod.hashPassword(user.password)
      user.resetCode = null
    }
  },
})
