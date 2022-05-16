import { prisma } from '@shared/infra/prisma/prisma'
import { NextFunction, Request, Response } from 'express'

export const disconnectPrisma = (req: Request, res: Response, next: NextFunction): void => {
  res.on('finish', () => prisma.$disconnect())
  next()
}
