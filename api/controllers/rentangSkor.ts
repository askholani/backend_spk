import { ModelRentanSkor } from '../models/rentangSkor'

export const ControllerRentangSkor = {
  create: async (req: any, res: any) => {
    try {
      const data = req.body
      const result = await ModelRentanSkor.create(data)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  findAll: async (req: any, res: any) => {
    try {
      const result = await ModelRentanSkor.findAll()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  findById: async (req: any, res: any) => {
    try {
      const result = await ModelRentanSkor.findById(req.params.id)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  update: async (req: any, res: any) => {
    try {
      const result = await ModelRentanSkor.update(req.params.id, req.body)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },

  delete: async (req: any, res: any) => {
    try {
      await ModelRentanSkor.delete(req.params.id)
      res.status(200).json({ message: 'Data Deleted' })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },
}
