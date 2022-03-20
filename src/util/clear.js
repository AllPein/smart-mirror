const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findUsers = async () => {
  return await prisma.user.findMany({})
}

const findSettings = async () => {
  return await prisma.settings.findMany({})
}

const deleteSetting = async (setting) => {
  return await prisma.settings.delete({
    where: { id: setting.id }
  })
}

const deleteUser = async (user) => {
  return await prisma.user.delete({
    where: { id: user.id }
  })
}

const deleteUsers = async () => {
  const users = await findUsers()
  users.map((user) => deleteUser(user))
}

const deleteSettings = async () => {
  const settings = await findSettings()
  settings.map((setting) => deleteSetting(setting))
}

const main = async () => {
  await deleteSettings()
  await deleteUsers()
}


main().then(() => {
  prisma.$disconnect()
})