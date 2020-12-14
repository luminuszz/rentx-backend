import { GqlModuleOptions } from '@nestjs/graphql'
import { formatterErrors } from 'src/shared/errors/gqerror.filter'

export const gqlModuleConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  playground: true,
  context: ({ req }) => ({ req }),
  formatError: formatterErrors,
}
