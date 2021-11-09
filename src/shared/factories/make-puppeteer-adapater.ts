import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'
import { PuppeteerAdapter } from '@shared/adapters/puppeteer/puppeteer'

export const makePuppeteerAdapter = (): AbstractPuppeteer => {
  return new PuppeteerAdapter()
}
