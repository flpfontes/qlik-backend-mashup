import env from '@main/config/env'
import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'

import { GetObjects } from './contracts/get-objects'

export class GetObjectsUseCase implements GetObjects {
  constructor (
    private readonly puppeteerAdapater: AbstractPuppeteer
  ) {}

  async execute (params: GetObjects.Params): Promise<GetObjects.Result[]> {
    const { sheetURL, resourceId } = params

    const browser = await this.puppeteerAdapater.getBrowser()

    const page = await this.puppeteerAdapater.login({ browser })

    await page.goto(sheetURL)

    await page.waitForSelector('#la-vie-tooltip', { timeout: 300000 })

    const objects = await page.evaluate(async () => {
      const objectsHTML = document.getElementsByClassName('qv-inner-object')

      return Array.from(objectsHTML).map(object => ({
        // @ts-ignore
        name: String(object.children[0].innerText),
        id: String(object.children[0].id).split('_')[0]
      }))
    })
    await page.close()

    const objectsImages = await Promise.all(
      objects.map(async (object) => {
        if (object.id) {
          const pageObject = await this.puppeteerAdapater.getPage({ browser })
          const objectURL = `${env.qlikURL}/single/?appid=${resourceId}&obj=${object.id}`

          try {
            await pageObject.goto(objectURL)

            await pageObject.waitForSelector('div#single-object[data-render-state="1"', { timeout: 300000 })

            const base64 = await pageObject.screenshot({ encoding: 'base64' })
            return {
              ...object,
              type: 'object',
              objectURL,
              imageURL: 'data:image/png;base64,' + base64
            }
          } catch (error) {
            console.log('ERROR APP ', objectURL)
            return null
          } finally {
            await pageObject.close()
          }
        }
      }))

    await browser.close()

    return objectsImages.filter(object => Boolean(object))
  }
}
