import type { NextFunction, Request, Response } from 'express'
import type { AuthCommands } from '../setupAuthCommands'
import { validateRequestParams, validateResponseObject } from './validation'

export const login =
  (loginCommand: AuthCommands['loginCommand']) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = validateRequestParams(req.body)

      const result = await loginCommand(data)

      const responseData = validateResponseObject(result)

      return res.status(200).json(responseData)
    } catch (error) {
      next(error)
    }
  }
