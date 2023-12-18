import { z } from 'zod'

export const changePasswordRequestSchema = z.object({
  email: z.string().email(),
  resetCode: z.string(),
  password: z.string().min(5),
})

export type ChangePasswordRequestParams = z.infer<typeof changePasswordRequestSchema>

export const validateRequestParams = (params: ChangePasswordRequestParams) => {
  return changePasswordRequestSchema.parse(params)
}
