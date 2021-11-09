import { Page } from 'puppeteer-core'

export interface GetSpaces {
  execute:(params:GetSpaces.Params) => Promise<GetSpaces.Result[]>;
}

export namespace GetSpaces {
  export type Params ={
    page:Page
  }

  export type Result = {
    id:string
    name:string
    description:string
    link:string
    type:string
  };
}
