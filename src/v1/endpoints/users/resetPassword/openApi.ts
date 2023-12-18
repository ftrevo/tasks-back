import { resetPasswordRequestSchema } from './validation'

export const resetUserPasswordOpenApiSpecs = {
  '/user/reset-password': {
    patch: {
      tags: ['User'],
      requestBody: {
        content: {
          'application/json': {
            schema: resetPasswordRequestSchema,
          },
        },
      },
      responses: {
        '204': {
          description: '204 Reset code sent',
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
