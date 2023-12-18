import { z } from 'zod'

export const createUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(5),
})

export type CreateUserRequestParams = z.infer<typeof createUserRequestSchema>

export const validateRequestParams = (params: CreateUserRequestParams) => {
  return createUserRequestSchema.parse(params)
}
