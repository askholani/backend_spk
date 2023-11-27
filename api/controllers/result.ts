import { ModelAlternatif } from '../models/alternatif'
import { ModelKriteria } from '../models/ktriteria'
import { ModelMatrix } from '../models/matrix'
import {
  getMinMaxValues,
  getNormalisasi,
  groupByAlternatif,
  groupByKriteria,
  getTertimbang,
  getMatriksBatas,
  getAlternatif,
  getTotalKriteria,
} from '../utils/helpers'

export const ControllerResult = {
  hasil: async (req: any, res: any) => {
    try {
      const tipe = req.query.tipe
      let result: any = ''

      const matrix = await ModelMatrix.findAll()
      const kriteria = await ModelKriteria.findAll()
      const alternatif = await ModelAlternatif.findAll()

      const data = groupByKriteria(matrix, kriteria)

      const minMax = getMinMaxValues(data, kriteria)
      const dataAlternatif = groupByAlternatif(matrix, kriteria, alternatif)

      // matrix normalisasi
      const normalisasi = getNormalisasi(dataAlternatif, minMax)

      // matrix tertimbang
      const tertimbang = getTertimbang(normalisasi, kriteria)

      const batas = getMatriksBatas(tertimbang)

      // matrix jarak alternatif
      const matrixAlternatif = getAlternatif(tertimbang, batas)

      // matrix hasil
      const matrixTotalKriteria = getTotalKriteria(matrixAlternatif)

      switch (tipe) {
        case 'normalisasi':
          result = normalisasi
          break
        case 'tertimbang':
          result = tertimbang
          break
        case 'batas':
          result = batas
          break
        case 'alternatif':
          result = matrixAlternatif
          break
        case 'hasil':
          result = matrixTotalKriteria
          break
      }

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },
}
