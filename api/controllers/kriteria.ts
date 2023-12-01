import { ModelKriteria } from '../models/ktriteria'
import { ModelMatrix } from '../models/matrix'

export const ControllerKriteria = {
  create: async (req: any, res: any) => {
    const { nama, bobot, jenis } = req.body
    const data = {
      nama,
      bobot,
      jenis: jenis === 'benefit' ? true : false,
    }
    try {
      const result = await ModelKriteria.create(data)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  findAll: async (req: any, res: any) => {
    try {
      const result = await ModelKriteria.findAll()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  findById: async (req: any, res: any) => {
    try {
      const result = await ModelKriteria.findById(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const { jenis, bobot, nama } = req.body
      console.log('req.body', req.body)
      const value = {
        nama,
        jenis: jenis === 'benefit' ? true : false,
        bobot,
      }
      console.log('value', value)

      const result = await ModelKriteria.update(req.params.id, value)

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      console.log('haiilllow')
      await ModelKriteria.delete(req.params.id)
      await ModelMatrix.deleteByKriteria(req.params.id)

      res.status(200).json({ message: 'Data Deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },

  deleteMany: async (req: any, res: any) => {
    try {
      const kriterias = await ModelKriteria.findAll()
      async function deleteKrteria() {
        for (const item of kriterias) {
          await ModelMatrix.deleteByKriteria(item.id)
        }
      }
      deleteKrteria()
      await ModelKriteria.deleteMany()

      res.status(200).json({ message: 'Data Deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Server Error' })
    }
  },
}
