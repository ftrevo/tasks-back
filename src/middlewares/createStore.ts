import type { NextFunction, Request, Response } from 'express'
import { randomUUID } from 'crypto'

import { logger, createStore } from '../infra'
import { Event } from 'socket.io'

const correlationIdHeader = 'x-correlation-id'

export const createStoreRestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = req.header(correlationIdHeader) ?? randomUUID()

  req.headers[correlationIdHeader] = correlationId
  res.setHeader(correlationIdHeader, correlationId)

  const childLogger = logger.child({
    correlationId,
  })

  createStore(
    {
      correlationId,
      logger: childLogger,
    },
    next
  )
}

export const createStoreSocketMiddleware = (_event: Event, next: (err?: Error) => void) => {
  const correlationId = randomUUID()

  const childLogger = logger.child({
    correlationId,
  })

  createStore(
    {
      correlationId,
      logger: childLogger,
    },
    next
  )
}
