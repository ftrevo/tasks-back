import type { NextFunction, Request, Response } from 'express'
import type { UserCommands } from '../setupUserCommands'
import { validateRequestParams, validateResponseObject } from './validation'

export const createUser =
  (createUserCommand: UserCommands['createCommand']) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = validateRequestParams(req.body)

      const result = await createUserCommand(data)

      const responseData = validateResponseObject(result)

      return res.status(201).json(responseData)
    } catch (error) {
      next(error)
    }
  }
