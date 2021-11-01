import { Express, Router } from 'express'
import fs from 'fs'
import path from 'path'

function getRoutesRecursive (dir: string) {
  let results = []

  fs.readdirSync(dir).forEach(function (file) {
    file = path.resolve(dir, file)
    const stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      results = results.concat(getRoutesRecursive(file))
    } else if (file.includes('-routes') && !file.endsWith('.map')) {
      results.push(file)
    }
  })

  return results
}

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const basePath = path.resolve(__dirname, '..', '..', 'modules')
  const routes = getRoutesRecursive(basePath)
  console.log('Rotas')
  routes.forEach(async file => {
    console.log('\t', file)
    return (await import(`${file}`)).default(router)
  })
}
