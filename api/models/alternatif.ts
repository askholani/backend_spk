import { prisma } from '../utils/db'

export const ModelAlternatif = {
  create: async (data: any) => {
    return await prisma.alternatif.create({ data })
  },
  findAll: async () => {
    return await prisma.alternatif.findMany()
  },
  findById: async (id: string) => {
    return await prisma.alternatif.findUnique({ where: { id } })
  },
  update: async (id: string, data: any) => {
    return await prisma.alternatif.update({ where: { id }, data })
  },
  delete: async (id: string) => {
    return await prisma.alternatif.delete({ where: { id } })
  },
}
