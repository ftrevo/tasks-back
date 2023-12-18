import { loginRequestSchema, loginResponseSchema } from './validation'

export const loginOpenApiSpecs = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      requestBody: {
        content: {
          'application/json': {
            schema: loginRequestSchema,
          },
        },
      },
      responses: {
        '200': {
          description: '200 Login sucessful',
          content: {
            'application/json': {
              schema: loginResponseSchema,
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
