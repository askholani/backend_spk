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

      const rawMatrix = await ModelMatrix.findAll()
      const matrix = rawMatrix.map((item: any) => ({
        ...item,
        nilai: parseFloat(item.nilai),
      }))
      // console.log('matrix', matrix)
      const rawKriteria = await ModelKriteria.findAll()
      // console.log('rawKriteria', rawKriteria)
      const kriteria = rawKriteria.map((item: any) => ({
        ...item,
        bobot: parseFloat(item.bobot),
      }))
      // console.log('kriteria', kriteria)
      // console.log('kriteria', kriteria)
      const alternatif = await ModelAlternatif.findAll()

      const data = groupByKriteria(matrix, kriteria)

      const minMax = getMinMaxValues(data, kriteria)
      const dataAlternatif = groupByAlternatif(matrix, kriteria, alternatif)

      // matrix normalisasi
      const normalisasi = getNormalisasi(dataAlternatif, minMax)

      // matrix tertimbang
      const tertimbang = getTertimbang(normalisasi, kriteria)
      // console.log('tertimbang1', tertimbang[0].data)

      const batas = getMatriksBatas(tertimbang)

      // matrix jarak alternatif
      const matrixAlternatif = getAlternatif(tertimbang, batas)

      // matrix hasil
      const matrixTotalKriteria = getTotalKriteria(matrixAlternatif)

      console.log('tertimbang2', tertimbang[0].data)

      switch (tipe) {
        case 'normalisasi':
          result = normalisasi
          console.log('normalisasi', result)
          break
        case 'tertimbang':
          result = tertimbang
          // console.log('tertimbang', tertimbang[0].data)
          // console.log('tertimbang result', result[0].data)
          break
        case 'batas':
          result = batas
          console.log('batas', result)
          break
        case 'alternatif':
          result = matrixAlternatif
          console.log('aterlantif', result)
          break
        case 'hasil':
          result = matrixTotalKriteria
          console.log('hasil', result)
          break
      }

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  },
}
