import { GraphQLError } from 'graphql'

type Path = string | number

interface ErrorHandler {
  message: string
  path: readonly Path[]
  originalError: Error
  query: string
}

export const formatterErrors = (error: GraphQLError): ErrorHandler => {
  const { message, path, originalError, source } = error

  return {
    message,
    path,
    originalError,
    query: source.body,
  }
}
