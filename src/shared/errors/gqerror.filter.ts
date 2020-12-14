import { GraphQLError } from 'graphql'

export const formatterErrors = (error: GraphQLError): any => {
  const { message, path, originalError, source } = error

  return {
    message,
    path,
    originalError,
    query: source.body,
  }
}
