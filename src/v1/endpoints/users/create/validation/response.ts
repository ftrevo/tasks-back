import { z } from 'zod'

export const createUserResponseSchema = z.object({
  token: z.string(),
  id: z.number().int().gte(0),
  name: z.string().min(1),
})

export type CreateUserResponseSchema = z.infer<typeof createUserResponseSchema>

export const validateResponseObject = (params: CreateUserResponseSchema) => {
  return createUserResponseSchema.parse(params)
}
