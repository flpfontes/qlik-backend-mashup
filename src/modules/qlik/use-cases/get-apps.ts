import env from '@main/config/env'
import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'

import { GetApps } from './contracts/get-apps'

type ResultAppsQLik = {
  id: string;
  name: string;
  link: string;
  resourceId: string;
  links: {
    self:{
      href:string
    }
  }
}

export class GetAppsUseCase implements GetApps {
  constructor (
    private readonly puppeteerAdapater: AbstractPuppeteer
  ) {}

  async execute (params: GetApps.Params): Promise<GetApps.Result[]> {
    const { page, spaceId } = params

    const data = await this.puppeteerAdapater.pageContentToJson({ page, link: `${env.qlikURL}/api/v1/items?spaceId=${spaceId}&resourceType=app,qvapp,qlikview&noActions=true` }) as ResultAppsQLik[]

    const apps = data.map((app) => ({
      id: app.id,
      name: app.name,
      link: app.links.self.href,
      resourceId: app.resourceId,
      type: 'app'
    }))

    return apps
  }
}
