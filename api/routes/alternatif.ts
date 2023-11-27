import express from 'express'
import { ControllerAlternatif } from '../controllers/alternatif'

const RouterAlternatif = express.Router()

RouterAlternatif.post('/', ControllerAlternatif.create)
RouterAlternatif.get('/', ControllerAlternatif.findAll)
RouterAlternatif.get('/:id', ControllerAlternatif.findById)
RouterAlternatif.put('/:id', ControllerAlternatif.update)
RouterAlternatif.delete('/:id', ControllerAlternatif.delete)

export default RouterAlternatif
