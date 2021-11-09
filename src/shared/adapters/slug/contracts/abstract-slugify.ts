import { SlugGenerate } from './generate'

export abstract class AbstractSlugify implements SlugGenerate {
 abstract generate(params: SlugGenerate.Params) : SlugGenerate.Result
}
