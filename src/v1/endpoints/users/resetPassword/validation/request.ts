import { z } from 'zod'

export const resetPasswordRequestSchema = z.object({
  email: z.string().email(),
})

export type ResetPasswordRequestParams = z.infer<typeof resetPasswordRequestSchema>

export const validateRequestParams = (params: ResetPasswordRequestParams) => {
  return resetPasswordRequestSchema.parse(params)
}
