import { loginOpenApiSpecs } from './auth'
import { pingOpenApiSpecs } from './ping'
import { userOpenApiSpecs } from './users'

export const openApiAppV1Paths = {
  ...loginOpenApiSpecs,
  ...pingOpenApiSpecs,
  ...userOpenApiSpecs,
}
