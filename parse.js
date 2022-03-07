const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({ include: {
    settings: true
  } })
  console.log(users)
}

main().then(() => {
  prisma.$disconnect()
})