import { changePasswordRequestSchema, changePasswordResponseSchema } from './validation'

export const changeUserPasswordOpenApiSpecs = {
  '/user/change-password': {
    patch: {
      tags: ['User'],
      requestBody: {
        content: {
          'application/json': {
            schema: changePasswordRequestSchema,
          },
        },
      },
      responses: {
        '200': {
          description: '200 User updated sucessfuly',
          content: {
            'application/json': {
              schema: changePasswordResponseSchema,
            },
          },
        },
        '400': {
          $ref: '#/components/responses/400BadRequest',
        },
        '404': {
          $ref: '#/components/responses/404NotFound',
        },
        '500': {
          $ref: '#/components/responses/500InternalError',
        },
      },
    },
  },
}
