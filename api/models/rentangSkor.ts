import { prisma } from '../utils/db'

export const ModelRentanSkor = {
  create: async (data: any) => {
    return await prisma.rentang_skor_kriteria.create({ data })
  },
  findAll: async () => {
    return await prisma.rentang_skor_kriteria.findMany()
  },
  findById: async (id: string) => {
    return await prisma.rentang_skor_kriteria.findUnique({ where: { id } })
  },
  update: async (id: string, data: any) => {
    return await prisma.rentang_skor_kriteria.update({ where: { id }, data })
  },
  delete: async (id: string) => {
    return await prisma.rentang_skor_kriteria.delete({ where: { id } })
  },
}
