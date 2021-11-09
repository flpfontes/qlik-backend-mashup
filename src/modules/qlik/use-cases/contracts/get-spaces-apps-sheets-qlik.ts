import { GetApps } from './get-apps'
import { GetSheets } from './get-sheets'
import { GetSpaces } from './get-spaces'

export interface GetSpacesAppsSheetsQlik {
  execute:() => Promise<GetSpacesAppsSheetsQlik.Result>;
}

export namespace GetSpacesAppsSheetsQlik {

  export type Result = GetSpaces.Result & {
    items: GetApps.Result & {
      items: GetSheets.Result[]
    }[]
  }
}
