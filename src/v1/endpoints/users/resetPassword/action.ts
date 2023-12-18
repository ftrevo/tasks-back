import type { NextFunction, Request, Response } from 'express'
import type { UserCommands } from '../setupUserCommands'
import { validateRequestParams } from './validation'

export const resetPassword =
  (resetUserCommand: UserCommands['resetPasswordCommand']) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = validateRequestParams(req.body)

      await resetUserCommand(data)

      return res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
