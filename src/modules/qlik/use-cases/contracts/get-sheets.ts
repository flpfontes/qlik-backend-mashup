import { Browser } from 'puppeteer'

import { GetApps } from './get-apps'

export interface GetSheets {
  execute:(params:GetSheets.Params) => Promise<GetSheets.Result[]>;
}

export namespace GetSheets {
  export type Params ={
    browser:Browser
    apps:GetApps.Result[]
  }

  export type Result = {
    id:string
    name:string
    type:string
    link:string

  };
}
