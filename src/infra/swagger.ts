import { createDocument, type ZodOpenApiObject } from 'zod-openapi'

import { openApiAppV1Paths, socketSchemas } from '../v1'

import { errors } from './errors'

const options: ZodOpenApiObject = {
  openapi: '3.1.0',
  info: {
    title: 'tasks-backend',
    version: '1.0.0',
    description: 'Tasks',
  },
  components: {
    responses: {
      ...errors,
    },
    schemas: {
      ...socketSchemas,
    },
  },
  paths: {
    ...openApiAppV1Paths,
  },
}

export const swaggerSpecification = createDocument(options)
