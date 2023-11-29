import { prisma } from '../utils/db'

export const ModelKriteria = {
  create: async (data: any) => {
    return await prisma.kriteria.create({ data })
  },
  findAll: async () => {
    return await prisma.kriteria.findMany()
  },
  findById: async (id: string) => {
    return await prisma.kriteria.findUnique({ where: { id } })
  },
  update: async (id: string, data: any) => {
    return await prisma.kriteria.update({ where: { id }, data })
  },
  delete: async (id: string) => {
    return await prisma.kriteria.delete({ where: { id } })
  },

  deleteMany: async () => {
    return await prisma.kriteria.deleteMany()
  },
}
