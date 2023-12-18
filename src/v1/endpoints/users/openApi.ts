import { createUserOpenApiSpecs } from './create'
import { resetUserPasswordOpenApiSpecs } from './resetPassword'
import { changeUserPasswordOpenApiSpecs } from './changePassword'

export const userOpenApiSpecs = {
  ...createUserOpenApiSpecs,
  ...resetUserPasswordOpenApiSpecs,
  ...changeUserPasswordOpenApiSpecs,
}
