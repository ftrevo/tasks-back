import type { NextFunction, Request, Response } from 'express'
import type { UserCommands } from '../setupUserCommands'
import { validateRequestParams, validateResponseObject } from './validation'

export const changePassword =
  (changeUserPasswordCommand: UserCommands['changePasswordCommand']) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = validateRequestParams(req.body)

      const result = await changeUserPasswordCommand(data)

      const responseData = validateResponseObject(result)

      return res.status(200).json(responseData)
    } catch (error) {
      next(error)
    }
  }
