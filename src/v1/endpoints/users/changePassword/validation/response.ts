import { z } from 'zod'

export const changePasswordResponseSchema = z.object({
  token: z.string(),
  id: z.number().int().gte(0),
  name: z.string().min(1),
})

export type ChangePasswordResponseSchema = z.infer<typeof changePasswordResponseSchema>

export const validateResponseObject = (params: ChangePasswordResponseSchema) => {
  return changePasswordResponseSchema.parse(params)
}
