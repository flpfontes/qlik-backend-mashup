import { Page } from 'puppeteer'

export interface GetApps {
  execute:(params:GetApps.Params) => Promise<GetApps.Result[]>;
}

export namespace GetApps {
  export type Params ={
    page:Page
    spaceId:string
  }

  export type Result = {
    id:string;
    name:string;
    link:string;
    resourceId:string;
    iframe:string
  };
}
