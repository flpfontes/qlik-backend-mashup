import { Page } from 'puppeteer-core'

export interface PageContentToJson {
  pageContentToJson: (params:PageContentToJson.Params) => Promise<PageContentToJson.Result>;
}

export namespace PageContentToJson {
  export type Params = {
    link:string;
    page:Page;
  }

  export type Result = any;
}
