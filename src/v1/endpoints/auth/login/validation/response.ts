import { z } from 'zod'

export const loginResponseSchema = z.object({
  token: z.string(),
  id: z.number().int().gte(0),
  name: z.string().min(1),
})

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>

export const validateResponseObject = (params: LoginResponseSchema) => {
  return loginResponseSchema.parse(params)
}
