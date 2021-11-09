import { makeSlugifyAdapter } from '../src/shared/factories/make-slugify-adapter'
import { LicenseQlik, PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()
const slugify = makeSlugifyAdapter()

async function main () {
  const user = await prisma.user.create({
    data: {
      name: 'felipe@athenasagricola.com.br',
      email: 'felipe@athenasagricola.com.br',
      idQlik: 'x3UR2mhwP3s6rRvjEsh55P5IFQg18Pvy',
      isAdmin: true,
      licenseQlik: LicenseQlik.professional
    }
  })

  const space = await prisma.space.create({
    data: {
      name: 'DC BIO',
      slug: slugify.generate('DC BIO')
    }
  })

  const group = await prisma.group.create({
    data: {
      name: 'Agricultura de Precisão',
      slug: slugify.generate('Agricultura de Precisão'),
      space: {
        connect: {
          id: space.id
        }
      }
    }
  })

  const vision = await prisma.vision.create({
    data: {
      name: 'Fertilidade',
      slug: slugify.generate('Fertilidade'),
      group: {
        connect: {
          id: group.id
        }
      },
      userVisions: {
        connectOrCreate: {
          where: {
            id: user.id
          },
          create: {
            userId: user.id
          }
        }
      }
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
