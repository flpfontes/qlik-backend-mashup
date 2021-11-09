import { AbstractSlugify } from '../adapters/slug/contracts/abstract-slugify'
import { SlugifyAdapter } from '../adapters/slug/slugify'

export const makeSlugifyAdapter = (): AbstractSlugify => {
  return new SlugifyAdapter()
}
