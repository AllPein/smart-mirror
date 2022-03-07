import { ROLES } from ".prisma/client"

const rights: Map<string, string[]> = new Map()
rights.set(ROLES.ADMIN, ['manageItems'])
rights.set(ROLES.EMPLOYEE, ['manageItems'])
rights.set(ROLES.MANAGER, ['manageItems'])

export default rights