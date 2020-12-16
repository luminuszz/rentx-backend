import { injectResolver } from '../../../utils/injectResolver'
import { IHashProvider } from '../dtos/hashProvider.dto'
import { BcryptHashProvider } from './brcrypt.provider'

export const HashProvider = injectResolver(IHashProvider, {
  development: BcryptHashProvider,
  production: BcryptHashProvider,
})
