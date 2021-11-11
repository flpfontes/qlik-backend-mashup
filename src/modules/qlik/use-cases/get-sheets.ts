
import env from '@main/config/env'
import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'

import { GetSheets } from './contracts/get-sheets'

export type SheetQlik = {
  id: string
  name: string
}

export class GetSheetsUseCase implements GetSheets {
  constructor (
    private readonly puppeteerAdapater: AbstractPuppeteer
  ) {}

  async execute (params: GetSheets.Params): Promise<GetSheets.Result[]> {
    const { browser, apps } = params

    const sheetsItems = await Promise.all(apps.map(async app => {
      const page = await this.puppeteerAdapater.getPage({ browser })

      const link = `${env.qlikURL}/sense/app/${app.resourceId}`
      await page.goto(link)

      try {
        await page.waitForSelector('.section-title', { timeout: 300000 })

        const HTMLContent = await page.evaluate(async () => {
          const publics = document.getElementById('approved-sheet-section')

          let sheets = []

          if (publics) {
            const publicSheets = publics.getElementsByTagName('li')

            sheets = Array.from(publicSheets).map((publicFolder) => ({
              id: publicFolder.dataset.name,
              name: publicFolder.innerText
            }))
          }

          return sheets
        }) as SheetQlik[]

        return {
          ...app,
          link,
          type: 'sheet',
          items: HTMLContent.map(sheet => ({
            ...sheet,
            id: app.resourceId + '|' + sheet.id,
            type: 'folder',
            link: `${link}/sheet/${sheet.id}`,
            iframe: `${env.qlikURL}/single/?appid=${app.resourceId}&sheet=${sheet.id}`
          }))
        }
      } catch (error) {
        return null
      } finally {
        await page.close()
      }
    }))

    return sheetsItems.filter(sheet => Boolean(sheet) && Boolean(sheet.items))
  }
}
