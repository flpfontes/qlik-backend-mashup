import { bodyParser } from '@main/middlewares/body-parser'
import { contentType } from '@main/middlewares/content-type'
import { cors } from '@main/middlewares/cors'
import { log } from '@main/middlewares/log'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(log)
}
