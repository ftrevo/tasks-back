import { z } from 'zod'

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

export type LoginRequestParams = z.infer<typeof loginRequestSchema>

export const validateRequestParams = (params: LoginRequestParams) => {
  return loginRequestSchema.parse(params)
}
