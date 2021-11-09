import puppeteer, { Browser, Page } from 'puppeteer'

const BASE_URL = 'https://athenasagricola.us.qlikcloud.com'

type Space = {
  id:string;
  name:string;
  descritpiom:string
}

type Folder={
  id:string;
  name:string;
}

type App = {
  id:string;
  name:string;
  link:string;
  resourceId:string;
  folders?:Folder[]
}

async function getApps (page:Page, spaceId:string):Promise<App[]> {
  const apps = await page.evaluate(async (id) => {
    // eslint-disable-next-line no-undef
    const response = await fetch(`https://athenasagricola.us.qlikcloud.com/api/v1/items?sort=-updatedAt&limit=24&spaceId=${id}&resourceType=app,qvapp,qlikview&noActions=true`)

    const { data } = await response.json()

    return data
  }, spaceId)

  return apps.map((app:any) => ({
    id: app.id,
    name: app.name,
    link: app.links.open.href,
    resourceId: app.resourceId,
    type: 'app'
  }))
}

async function getSpaces (page:Page): Promise<Space[]> {
  const spaces = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    const response = await fetch('https://athenasagricola.us.qlikcloud.com/api/v1/spaces')

    const { data } = await response.json()

    return data
  })

  return spaces.map(space => ({
    id: space.id,
    name: space.name,
    description: space.description,
    link: `https://athenasagricola.us.qlikcloud.com/explore/spaces/${space.id}`
  }))
}

async function getOjects (browser:Browser, link:string, folderId:string, resourceId:string) {
  const page = await browser.newPage()

  const urlApp = `${link}/sheet/${folderId.split('|')[1]}`
  await page.goto(urlApp)

  let objects = []

  try {
    await page.waitForSelector('#la-vie-tooltip', { timeout: 300000 })

    objects = await page.evaluate(async () => {
      const objectsHTML = document.getElementsByClassName('qv-inner-object')

      return Array.from(objectsHTML).map(object => ({
        type: object.children[0].innerText,
        id: String(object.children[0].id).split('_')[0]
      }))
    })
  } catch (error) {
    console.log('ERROR', urlApp)
  } finally {
    await page.close()
  }

  const objectsImages = []

  await Promise.all(
    objects.map(async (object) => {
      if (object.id) {
        const pageObject = await browser.newPage()

        const urlObject = `${BASE_URL}/single/?appid=${resourceId}&obj=${object.id}`

        await pageObject.goto(urlObject)

        await pageObject.waitForSelector('.qv-inner-object', { timeout: 300000 })

        const base64 = await pageObject.screenshot({ encoding: 'base64' })

        objectsImages.push({
          ...object,
          urlObject,
          imageURL: 'data:image/png;base64,' + base64
        })
        await pageObject.close()
      }
    }))

  return objectsImages
}

async function getFolders (browser:Browser, apps:App[]) {
  const folders = await Promise.all(apps.map(async app => {
    const page = await browser.newPage()
    await page.goto(app.link)
    await page.waitForSelector('.app-details-wrapper', { timeout: 300000 })

    const foldersData:Folder[] = await page.evaluate(async (app) => {
      const publics = document.getElementById('approved-sheet-section')

      let folders = []

      if (publics) {
        const publicFolders = publics.getElementsByTagName('li')

        folders = Array.from(publicFolders).map((publicFolder) => ({
          id: app.id + '|' + publicFolder.dataset.name,
          name: publicFolder.innerText,
          type: 'folder',
          link: `${app.link}/sheet/${publicFolder.dataset.name}`
        }))
      }

      return folders
    }, app)

    // let foldersObjects = []

    // if (foldersData.length > 0) {
    //   foldersObjects = await Promise.all(
    //     foldersData.map(async folder => ({
    //       ...folder,
    //       items: await getOjects(browser, app.link, folder.id, app.resourceId)
    //     }))
    //   )
    // }

    await page.close()
    return {
      ...app,
      items: foldersData
    }
  }))

  return folders.filter(fl => fl?.items?.length > 0)
}

async function getData () {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--headless',
      '--disable-gpu',
      '--window-size=1920x1080'
    ]
  })
  const page = await browser.newPage()

  await page.goto('https://athenasagricola.us.qlikcloud.com/')
  await page.waitForNavigation()

  await page.evaluate(async () => {
    const email = document.getElementById('email')
    email.value = 'felipe@athenasagricola.com.br'

    const password = document.getElementById('password')
    password.value = '@n@liz5Verru20qlik'

    const btnLogin = document.getElementById('btn-login')
    btnLogin.click()
  })

  await page.waitForSelector('#main_page_content')

  // const spaceName = await page.evaluate(async () => {
  //   return document.getElementsByClassName('space-switcher__selected__name')[0].innerHTML
  // })

  // const splitLink = link.split('/')
  // const spaceId = splitLink[splitLink.length - 1]

  const spaces = await getSpaces(page)

  const spacesApps = await Promise.all(spaces.map(async space => ({
    ...space,
    type: 'space',
    items: await getApps(page, space.id)
  })))

  const appsFolders = await Promise.all(
    spacesApps.map(async (space) => ({
      ...space,
      items: await getFolders(browser, space.items)
    }))
  )

  await page.close()
  await browser.close()

  return appsFolders
}

export { getData }
