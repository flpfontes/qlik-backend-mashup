import { GetBrowser } from './get-browser'
import { GetPage } from './get-page'
import { Login } from './login'
import { PageContentToJson } from './page-content-to-json'

export abstract class AbstractPuppeteer implements Login, GetBrowser, GetPage, PageContentToJson {
  abstract getBrowser(): Promise<GetBrowser.Result>

  abstract getPage(params:GetPage.Params): Promise<GetPage.Result>

  abstract login(params: Login.Params): Promise<Login.Result>

  abstract pageContentToJson (params: PageContentToJson.Params): Promise<PageContentToJson.Result>
}
