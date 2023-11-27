import { prisma } from '../utils/db'

export const ModelMatrix = {
  create: async (data: any) => {
    return await prisma.matrix.create({ data })
  },
  findAll: async () => {
    return await prisma.matrix.findMany()
  },
  findById: async (id: string) => {
    return await prisma.matrix.findUnique({ where: { id } })
  },

  findByKriteriaAlternatif: async (
    id_alternatif: string,
    id_kriteria: string,
  ) => {
    return await prisma.matrix.findFirst({
      where: {
        id_alternatif,
        id_kriteria,
      },
    })
  },
  update: async (id: string, data: any) => {
    return await prisma.matrix.update({ where: { id }, data })
  },
  delete: async (id: string) => {
    return await prisma.matrix.delete({ where: { id } })
  },

  deleteByKriteria: async (id_kriteria: string) => {
    return await prisma.matrix.deleteMany({
      where: { id_kriteria: id_kriteria },
    })
  },

  deleteByAlternatif: async (id_alternatif: string) => {
    return await prisma.matrix.deleteMany({
      where: {
        id_alternatif: id_alternatif,
      },
    })
  },
}
