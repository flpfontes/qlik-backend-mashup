import env from '@main/config/env'
import { UserRepository } from '@modules/user/repository/prisma/user'
import { AbstractPuppeteer } from '@shared/adapters/puppeteer/contracts/abstract-puppeteer'

import { LicenseQlikModel } from '../repository/model/license'
import { UserQlikModel } from '../repository/model/user'
import { GetUsersQlikAndInsertDb } from './contracts/get-users-qlik-and-insert-db'

export class GetUsersQlikAndInsertDbUseCase implements GetUsersQlikAndInsertDb {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly puppeteerAdapater: AbstractPuppeteer
  ) {}

  async execute (): Promise<GetUsersQlikAndInsertDb.Result> {
    const browser = await this.puppeteerAdapater.getBrowser()
    const page = await this.puppeteerAdapater.login({ browser })

    const users = await this.puppeteerAdapater.pageContentToJson({ page, link: `${env.qlikURL}/api/v1/users` }) as UserQlikModel[]
    const licenses = await this.puppeteerAdapater.pageContentToJson({ page, link: `${env.qlikURL}/api/v1/licenses/assignments` }) as LicenseQlikModel[]

    await page.close()
    await browser.close()

    const usersQlik = await Promise.all(
      users.map(async userQlik => {
        const userExist = await this.userRepository.getByIdQlik({ idQlik: userQlik.id })

        let user = null
        const license = licenses.find(l => l.userId === userQlik.id)

        if (!userExist) {
          user = await this.userRepository.create({
            isAdmin: false,
            email: userQlik.email || userQlik.name,
            idQlik: userQlik.id,
            name: userQlik.name,
            licenseQlik: license ? license.type : null
          })

          return user
        }

        user = await this.userRepository.update({
          id: userExist.id,
          email: userQlik.email || userQlik.name,
          idQlik: userQlik.id,
          name: userQlik.name,
          licenseQlik: license ? license.type : null,
          isAdmin: userExist.isAdmin
        })

        return user
      })
    )

    return usersQlik
  }
}
