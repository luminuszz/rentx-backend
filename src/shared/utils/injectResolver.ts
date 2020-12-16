import { Abstract, Provider, Type } from '@nestjs/common'

type AbstractType<T = unknown> = string | symbol | Type<T> | Abstract<T>

type state<T> = {
  development: Type<T>
  production: Type<T>
}

export function injectResolver(
  abstraction: AbstractType,
  { development, production }: state<unknown>
): Provider {
  const provide = abstraction

  switch (process.env.NODE) {
    case 'development':
      return { provide, useClass: development }

    case 'production':
      return {
        provide,
        useClass: production,
      }

    default:
      return { provide, useClass: development }
  }
}
