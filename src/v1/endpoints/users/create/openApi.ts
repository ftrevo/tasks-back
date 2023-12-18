import { createUserRequestSchema, createUserResponseSchema } from './validation'

export const createUserOpenApiSpecs = {
  '/user': {
    post: {
      tags: ['User'],
      requestBody: {
        content: {
          'application/json': {
            schema: createUserRequestSchema,
          },
        },
      },
      responses: {
        '201': {
          description: '201 User created sucessfuly',
          content: {
            'application/json': {
              schema: createUserResponseSchema,
            },
          },
        },
        '400': {
          $ref: '#/components/responses/400BadRequest',
        },
        '500': {
          $ref: '#/components/responses/500InternalError',
        },
      },
    },
  },
}
