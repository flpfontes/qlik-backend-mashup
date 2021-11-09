import slugify from 'slugify'

import { AbstractSlugify } from './contracts/abstract-slugify'
import { SlugGenerate } from './contracts/generate'

export class SlugifyAdapter extends AbstractSlugify {
  generate (plaintext: SlugGenerate.Params): SlugGenerate.Result {
    const slug = slugify(plaintext, {
      replacement: '-',
      lower: true
    })

    return slug
  }
}
