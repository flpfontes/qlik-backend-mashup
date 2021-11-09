import { Browser, Page } from 'puppeteer'

export interface Login {
  login: (params:Login.Params) => Promise<Login.Result>;
}

export namespace Login {
  export type Params = {
    url?:string;
    browser:Browser
  }

  export type Result = Page;
}
