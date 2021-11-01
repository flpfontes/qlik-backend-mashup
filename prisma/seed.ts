import { LicenseQlik, PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

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
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
