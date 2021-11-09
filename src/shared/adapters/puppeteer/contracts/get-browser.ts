import { Browser } from 'puppeteer'

export interface GetBrowser {
  getBrowser: () => Promise<GetBrowser.Result>;
}

export namespace GetBrowser {
  export type Result = Browser
}
