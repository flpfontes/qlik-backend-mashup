
import env from '@main/config/env'
import puppeteer from 'puppeteer'

import { AbstractPuppeteer } from './contracts/abstract-puppeteer'
import { GetBrowser } from './contracts/get-browser'
import { GetPage } from './contracts/get-page'
import { Login } from './contracts/login'
import { PageContentToJson } from './contracts/page-content-to-json'

export class PuppeteerAdapter extends AbstractPuppeteer {
  async getBrowser (): Promise<GetBrowser.Result> {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--use-gl=egl',
        '--disable-dev-shm-usage',
        '--shm-size=3gb'
      ]
    })

    return browser
  }

  async getPage (params: GetPage.Params): Promise<GetPage.Result> {
    const { browser } = params

    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36')

    return page
  }

  async login (params:Login.Params): Promise<Login.Result> {
    const { browser, url } = params

    const page = await this.getPage({ browser })

    await page.goto(url || env.qlikURL)
    await page.waitForNavigation()

    await page.evaluate(async (env) => {
      const email = document.getElementById('email')
      // @ts-ignore
      email.value = env.qlikLogin

      const password = document.getElementById('password')
      // @ts-ignore
      password.value = env.qlikPassword

      const btnLogin = document.getElementById('btn-login')
      btnLogin.click()
    }, env)

    await page.waitForSelector('.custom-home', { timeout: 300000 })

    return page
  }

  async pageContentToJson (params: PageContentToJson.Params): Promise<PageContentToJson.Result> {
    const { page, link: url } = params

    const content = await page.evaluate(async (url:string) => {
      let data = null

      while (true) {
        // eslint-disable-next-line no-undef
        const response = await fetch(url)
        const json = await response.json()

        if (data) {
          data = [...data, ...json.data]
        } else {
          data = json.data
        }
        if (json?.links?.next?.href) {
          url = json?.links?.next?.href
        } else {
          break
        }
      }

      return Array.from(data)
    }, url)

    return content
  }
}
