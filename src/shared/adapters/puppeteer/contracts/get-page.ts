import { Browser, Page } from 'puppeteer-core'

export interface GetPage {
  getPage: (params:GetPage.Params) => Promise<GetPage.Result>;
}

export namespace GetPage {
  export type Params = {
    browser:Browser
  }
  export type Result = Page
}
