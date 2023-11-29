import { ModelAlternatif } from '../models/alternatif'
import { ModelMatrix } from '../models/matrix'

export const ControllerAlternatif = {
  create: async (req: any, res: any) => {
    try {
      const data = req.body
      console.log('data', data)
      const result = await ModelAlternatif.create(data)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  findAll: async (req: any, res: any) => {
    try {
      const result = await ModelAlternatif.findAll()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  findById: async (req: any, res: any) => {
    try {
      const result = await ModelAlternatif.findById(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const result = await ModelAlternatif.update(req.params.id, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      await ModelAlternatif.delete(req.params.id)
      await ModelMatrix.deleteByAlternatif(req.params.id)
      res.status(200).json({ message: 'Data Deleted' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  deleteMany: async (req: any, res: any) => {
    try {
      const kriterias = await ModelAlternatif.findAll()
      async function deleteKrteria() {
        for (const item of kriterias) {
          await ModelMatrix.deleteByKriteria(item.id)
        }
      }
      deleteKrteria()
      await ModelAlternatif.deleteMany()

      res.status(200).json({ message: 'Data Deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },
}
