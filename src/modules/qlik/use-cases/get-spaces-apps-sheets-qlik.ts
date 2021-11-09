import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'

import { GetApps } from './contracts/get-apps'
import { GetSheets } from './contracts/get-sheets'
import { GetSpaces } from './contracts/get-spaces'
import { GetSpacesAppsSheetsQlik } from './contracts/get-spaces-apps-sheets-qlik'

export class GetSpacesAppsSheetsQlikUseCase implements GetSpacesAppsSheetsQlik {
  constructor (
    private readonly getSpacesUseCase: GetSpaces,
    private readonly getAppsUseCase: GetApps,
    private readonly getSheetsUseCase: GetSheets,
    private readonly puppeteerAdapater: AbstractPuppeteer
  ) {}

  async execute (): Promise<GetSpacesAppsSheetsQlik.Result> {
    const browser = await this.puppeteerAdapater.getBrowser()
    const page = await this.puppeteerAdapater.login({ browser })

    const spaces = await this.getSpacesUseCase.execute({ page })

    const spacesApps = await Promise.all(
      spaces.map(async (space) => ({
        id: space.id,
        name: space.name,
        description: space.description,
        link: space.link,
        type: 'space',
        items: await this.getAppsUseCase.execute({ page, spaceId: space.id })
      }))
    )

    const spacesAppsSheets = await Promise.all(
      spacesApps.map(async spaceApps => ({
        ...spaceApps,
        items: await this.getSheetsUseCase.execute({ browser, apps: spaceApps.items })
      }))
    ) as any

    await page.close()
    await browser.close()

    return spacesAppsSheets
  }
}
