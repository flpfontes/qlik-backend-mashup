import env from '@main/config/env'
import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'

import { GetSpaces } from './contracts/get-spaces'

export class GetSpacesUseCase implements GetSpaces {
  constructor (
    private readonly puppeteerAdapater: AbstractPuppeteer
  ) {}

  async execute (params: GetSpaces.Params): Promise<GetSpaces.Result[]> {
    const { page } = params

    const spaces = await this.puppeteerAdapater.pageContentToJson({ page, link: `${env.qlikURL}/api/v1/spaces` }) as GetSpaces.Result[]

    return spaces
  }
}
